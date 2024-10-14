package movements

import (
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/marianop9/stocker/app/stocker"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

type StockEntryDto struct {
	Id            string `json:"id"`
	MovementId    string `json:"movementId"`
	ProductUnitId string `json:"productUnitId"`
	Quantity      int    `json:"quantity"`
}

func RegisterMovementsHandlers(app *stocker.StockerApp) {
	app.AddCustomHandler(stocker.ModuleMovements, "createStockEntry", http.MethodPost, func(c echo.Context) error {
		var reqBody []StockEntryDto
		if err := c.Bind(&reqBody); err != nil {
			return err
		}

		collection, err := app.PbApp.Dao().FindCollectionByNameOrId(stocker.CollectionStockEntries)
		if err != nil {
			return err
		}

		txErr := app.PbApp.Dao().RunInTransaction(func(txDao *daos.Dao) error {
			for _, stockEntry := range reqBody {
				record := models.NewRecord(collection)

				form := forms.NewRecordUpsert(app.PbApp, record)
				form.SetDao(txDao)

				err := form.LoadData(map[string]any{
					"movementId":    stockEntry.MovementId,
					"productUnitId": stockEntry.ProductUnitId,
					"quantity":      stockEntry.Quantity,
				})

				if err != nil {
					return err
				}

				if err := form.Submit(); err != nil {
					return err
				}
			}

			return nil
		})

		if txErr != nil {
			return txErr
		}

		return c.JSON(http.StatusOK, map[string]int{
			"len": len(reqBody),
		})
	})
}
