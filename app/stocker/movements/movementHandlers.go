package movements

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/marianop9/stocker/app/stocker"
	"github.com/marianop9/stocker/app/stocker/utils"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
)

const (
	ErrTypeNotSupported = "movement type not supported"
	ErrStateNotOpen     = "movement is not open"
	ErrIsDeleted        = "movement is deleted"
)

var handleCreateStockMovement stocker.StockerHandlerBuilder = func(app *stocker.StockerApp) stocker.PbHandlerFunc {
	return func(e *core.RequestEvent) error {
		var reqBody StockMovementDto
		if err := e.BindBody(&reqBody); err != nil {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponse(err))
		}

		movement, err := app.PbApp.FindRecordById(stocker.CollectionMovements, reqBody.MovementId)
		if err != nil {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponse(err))
		}
		movementType := movement.GetString("type")

		var movementTypeCollection string
		if movementType == MovementTypeIn {
			movementTypeCollection = stocker.CollectionStockEntries
		} else if movementType == MovementTypeOut {
			movementTypeCollection = stocker.CollectionStockExits
		}

		collection, err := app.PbApp.FindCollectionByNameOrId(movementTypeCollection)
		if err != nil {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponse(err))
		}

		err = app.PbApp.RunInTransaction(func(txApp core.App) error {
			for _, stockEntry := range reqBody.Units {
				record := core.NewRecord(collection)

				record.Load(map[string]any{
					"movementId":    reqBody.MovementId,
					"productUnitId": stockEntry.ProductUnitId,
					"quantity":      stockEntry.Quantity,
				})

				if err := txApp.Save(record); err != nil {
					return err
				}
			}

			return nil
		})

		if err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(err))
		}

		return e.JSON(http.StatusOK, utils.NewSuccessResponse())
	}
}

var handleCloseMovement stocker.StockerHandlerBuilder = func(app *stocker.StockerApp) stocker.PbHandlerFunc {
	return func(e *core.RequestEvent) error {
		movementId := e.Request.PathValue("movementId")
		if movementId == "" {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponseMessage("must provide a movement id"))
		}

		// collection, err := app.PbApp.Dao().FindCollectionByNameOrId(stocker.CollectionMovements)
		// if err != nil {
		// 	return err
		// }

		record, err := app.PbApp.FindRecordById(stocker.CollectionMovements, movementId)
		if err != nil {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponseMessage("no movements match the supplied id"))
		}

		if err = applyMovement(app, record); err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(err))
		}

		return e.JSON(http.StatusOK, utils.NewSuccessResponse())
	}
}

func applyMovement(app *stocker.StockerApp, movementRecord *core.Record) error {
	if deleted := movementRecord.GetString("deleted"); deleted != "" {
		return errors.New(ErrIsDeleted)
	}

	movState := movementRecord.GetString("state")

	if movState != MovementStateOpen {
		return errors.New(ErrStateNotOpen)
	}

	movType := movementRecord.GetString("type")

	var childCollectionName string
	switch movType {
	case MovementTypeIn:
		childCollectionName = stocker.CollectionStockEntries
	case MovementTypeOut:
		childCollectionName = stocker.CollectionStockExits
	default:
		return errors.New(ErrTypeNotSupported)
	}

	// stock entries/exits
	childRecords, err := app.PbApp.FindAllRecords(childCollectionName, dbx.HashExp{"movementId": movementRecord.Id})
	if err != nil {
		return err
	}

	err = app.PbApp.RunInTransaction(func(txApp core.App) error {
		// each child holds the quantity to add/subtract for a single product_unit
		for _, child := range childRecords {
			productUnit, err := txApp.FindRecordById(stocker.CollectionProductUnits, child.GetString("productUnitId"))
			if err != nil {
				return err
			}

			// movement types already checked in previous switch
			switch movType {
			case MovementTypeIn:
				productUnit.Set("quantity+", child.GetInt("quantity"))
			case MovementTypeOut:
				productUnit.Set("quantity-", child.GetInt("quantity"))
			}

			if err := txApp.Save(productUnit); err != nil {
				return err
			}
		}

		// close movement
		movementRecord.Set("state", MovementStateClosed)
		if err = txApp.Save(movementRecord); err != nil {
			return err
		}

		return nil
	})

	return err
}

var handleAnnulMovement stocker.StockerHandlerBuilder = func(app *stocker.StockerApp) stocker.PbHandlerFunc {
	return func(e *core.RequestEvent) error {
		movementId := e.Request.PathValue("movementId")
		if movementId == "" {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponseMessage("must provide a movement id"))
		}

		record, err := app.PbApp.FindRecordById(stocker.CollectionMovements, movementId)
		if err != nil {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponseMessage("no movements match the supplied id"))
		}

		var actionErr error
		if state := record.GetString("state"); state == MovementStateOpen {
			actionErr = deleteMovement(app, record)
		} else {
			actionErr = annullMovement(app, record)
		}

		if actionErr != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(fmt.Errorf("failed to delete/annul movement: %w", actionErr)))
		}

		return e.JSON(http.StatusOK, utils.NewSuccessResponse())
	}
}

func deleteMovement(app *stocker.StockerApp, record *core.Record) error {
	prevState := record.GetString("state")
	err := checkStateTransition(prevState, MovementStateAnnulled)
	if err != nil {
		return err
	}

	return app.PbApp.Delete(record)
}

func annullMovement(app *stocker.StockerApp, record *core.Record) error {
	// NO ELIMINAR FISICAMENTE
	prevState := record.GetString("state")
	newState := MovementStateAnnulled
	err := checkStateTransition(prevState, newState)
	if err != nil {
		return err
	}

	// revertir movimientos de stock
	movType := record.GetString("type")

	var childCollectionName string
	switch movType {
	case MovementTypeIn:
		childCollectionName = stocker.CollectionStockEntries
	default:
		return errors.New(ErrTypeNotSupported)
	}

	// stock entries/exits
	childRecords, err := app.PbApp.FindAllRecords(childCollectionName, dbx.HashExp{"movementId": record.Id})
	if err != nil {
		return err
	}

	err = app.PbApp.RunInTransaction(func(txApp core.App) error {
		// each child holds the quantity to add/subtract for a single product_unit
		for _, child := range childRecords {
			productUnit, err := txApp.FindRecordById(stocker.CollectionProductUnits, child.GetString("productUnitId"))
			if err != nil {
				return err
			}

			switch movType {
			case MovementTypeIn:
				productUnit.Set("quantity-", child.GetInt("quantity"))
			case MovementTypeOut:
				productUnit.Set("quantity+", child.GetInt("quantity"))
			default:
				return errors.New("Movement annulation not implemented for type " + movType)
			}

			if err := txApp.Save(productUnit); err != nil {
				return err
			}
		}

		// pasar mov a estado anulado
		record.Set("state", newState)
		return txApp.Save(record)
	})

	return err
}
