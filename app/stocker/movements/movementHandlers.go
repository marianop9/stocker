package movements

import (
	"errors"
	"net/http"

	"github.com/marianop9/stocker/app/stocker"
	"github.com/marianop9/stocker/app/stocker/utils"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
)

const (
	MovementTypeIn  = "IN"
	MovementTypeOut = "OUT"
)

const (
	MovementStateOpen   = "OPEN"
	MovementStateClosed = "CLOSED"
)

const (
	ErrTypeNotSupported = "movement type not supported"
	ErrStateNotOpen     = "movement is not open"
	ErrIsDeleted        = "movement is deleted"
)

var handleCreateStockEntry stocker.StockerHandlerBuilder = func(app *stocker.StockerApp) stocker.PbHandlerFunc {
	return func(e *core.RequestEvent) error {
		var reqBody []StockEntryDto
		if err := e.BindBody(&reqBody); err != nil {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponse(err))
		}

		collection, err := app.PbApp.FindCollectionByNameOrId(stocker.CollectionStockEntries)
		if err != nil {
			return e.JSON(http.StatusBadRequest, utils.NewErrorResponse(err))
		}

		err = app.PbApp.RunInTransaction(func(txApp core.App) error {
			for _, stockEntry := range reqBody {
				record := core.NewRecord(collection)

				record.Load(map[string]any{
					"movementId":    stockEntry.MovementId,
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

		return e.JSON(http.StatusOK, map[string]int{
			"len": len(reqBody),
		})
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

func applyMovement(app *stocker.StockerApp, record *core.Record) error {
	if deleted := record.GetString("deleted"); deleted != "" {
		return errors.New(ErrIsDeleted)
	}

	movState := record.GetString("state")

	if movState != MovementStateOpen {
		return errors.New(ErrStateNotOpen)
	}

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

			if movType == MovementTypeIn {
				productUnit.Set("quantity+", child.GetInt("quantity"))
			} else {
				panic("MovTypeOut not implemented")
			}

			if err := txApp.Save(productUnit); err != nil {
				return err
			}
		}

		// close movement
		record.Set("state", MovementStateClosed)
		if err = txApp.Save(record); err != nil {
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
		switch state := record.GetString("state"); state {
		case "CLOSED":
			annullMovement(app, record)
		case "OPEN":
			deleteMovement(app, record)
		default:
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponseMessage("unknown movement state "+ state))
		}

		if actionErr != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(actionErr))
		}

		return e.JSON(http.StatusOK, utils.NewSuccessResponse())
	}
}

func deleteMovement(app *stocker.StockerApp, record *core.Record) error {
	err := app.PbApp.Delete(record)

	return err
}

func annullMovement(app *stocker.StockerApp, record *core.Record) error {
	// cambiar nombre de columna deleted -> annulled
	// revertir movimientos de stock
	// poner estado anulado (decidir si cambiar la columna state o dejarla como esta y poner fecha (annulled))
	// NO ELIMINAR FISICAMENTE
	
	return errors.New("not implemented")
}