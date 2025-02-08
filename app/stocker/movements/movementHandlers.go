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

var ErrTypeUnknown = errors.New("unknown movement type")

const (
	ErrTypeNotSupported = "movement type not known/supported"
	ErrStateNotOpen     = "movement is not open"
	ErrIsDeleted        = "movement is deleted"
)

type StockMovementDto struct {
	Id         string `json:"id"`
	MovementId string `json:"movementId"`
	IsReturn   bool   `json:"isReturn"`
	Units      []struct {
		ProductUnitId string `json:"productUnitId"`
		Quantity      int    `json:"quantity"`
	} `json:"units"`
}

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
		switch movementType {
		case MovementTypeIn:
			movementTypeCollection = stocker.CollectionStockEntries
		case MovementTypeOut:
			movementTypeCollection = stocker.CollectionStockExits
		case MovementTypeExchange:
			if reqBody.IsReturn {
				movementTypeCollection = stocker.CollectionStockEntries
			} else {
				movementTypeCollection = stocker.CollectionStockExits
			}
		}

		collection, err := app.PbApp.FindCollectionByNameOrId(movementTypeCollection)
		if err != nil {
			return e.JSON(http.StatusInternalServerError, utils.NewErrorResponse(err))
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

	var entries, exits []*core.Record
	var queryErr error

	switch movType {
	case MovementTypeIn:
		if entries, queryErr = app.PbApp.FindAllRecords(
			stocker.CollectionStockEntries,
			dbx.HashExp{"movementId": movementRecord.Id},
		); queryErr != nil {
			return queryErr
		}
	case MovementTypeOut:
		if exits, queryErr = app.PbApp.FindAllRecords(
			stocker.CollectionStockExits,
			dbx.HashExp{"movementId": movementRecord.Id},
		); queryErr != nil {
			return queryErr
		}
	case MovementTypeExchange:
		if entries, queryErr = app.PbApp.FindAllRecords(
			stocker.CollectionStockEntries,
			dbx.HashExp{"movementId": movementRecord.Id},
		); queryErr != nil {
			return queryErr
		}
		if exits, queryErr = app.PbApp.FindAllRecords(
			stocker.CollectionStockExits,
			dbx.HashExp{"movementId": movementRecord.Id},
		); queryErr != nil {
			return queryErr
		}
	}

	if err := validateMovementClose(movType, entries, exits); err != nil {
		return err
	}

	err := app.PbApp.RunInTransaction(func(txApp core.App) error {
		// each child holds the quantity to add/subtract for a single product_unit
		for _, entry := range entries {
			productUnit, err := txApp.FindRecordById(stocker.CollectionProductUnits, entry.GetString("productUnitId"))
			if err != nil {
				return err
			}

			productUnit.Set("quantity+", entry.GetInt("quantity"))

			if err := txApp.Save(productUnit); err != nil {
				return err
			}
		}

		for _, exit := range exits {
			productUnit, err := txApp.FindRecordById(stocker.CollectionProductUnits, exit.GetString("productUnitId"))
			if err != nil {
				return err
			}

			productUnit.Set("quantity-", exit.GetInt("quantity"))

			if err := txApp.Save(productUnit); err != nil {
				return err
			}
		}

		// close movement
		movementRecord.Set("state", MovementStateClosed)
		return txApp.Save(movementRecord)
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
	newState := MovementStateDeleted
	err := checkStateTransition(prevState, newState)
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

	var entries, exits []*core.Record

	switch movType {
	case MovementTypeIn:
		if entries, err = app.PbApp.FindAllRecords(
			stocker.CollectionStockEntries,
			dbx.HashExp{"movementId": record.Id},
		); err != nil {
			return err
		}
	case MovementTypeOut:
		if exits, err = app.PbApp.FindAllRecords(
			stocker.CollectionStockExits,
			dbx.HashExp{"movementId": record.Id},
		); err != nil {
			return err
		}
	case MovementTypeExchange:
		if entries, err = app.PbApp.FindAllRecords(
			stocker.CollectionStockEntries,
			dbx.HashExp{"movementId": record.Id},
		); err != nil {
			return err
		}
		if exits, err = app.PbApp.FindAllRecords(
			stocker.CollectionStockExits,
			dbx.HashExp{"movementId": record.Id},
		); err != nil {
			return err
		}
	default:
		return errors.New(ErrTypeNotSupported)
	}

	err = app.PbApp.RunInTransaction(func(txApp core.App) error {
		// each child holds the quantity to add/subtract for a single product_unit
		for _, entry := range entries {
			productUnit, err := txApp.FindRecordById(stocker.CollectionProductUnits, entry.GetString("productUnitId"))
			if err != nil {
				return err
			}

			productUnit.Set("quantity-", entry.GetInt("quantity"))

			if err := txApp.Save(productUnit); err != nil {
				return err
			}
		}

		for _, exit := range exits {
			productUnit, err := txApp.FindRecordById(stocker.CollectionProductUnits, exit.GetString("productUnitId"))
			if err != nil {
				return err
			}

			productUnit.Set("quantity+", exit.GetInt("quantity"))

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
