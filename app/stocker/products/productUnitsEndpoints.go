package products

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/marianop9/stocker/app/stocker"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
)

const module = stocker.ModuleProductUnits

func RegisterProductUnitsHandlers(app *stocker.StockerApp) {
	type ProductUnitDto struct {
		ProductId string `json:"productId"`
		ColorId   string `json:"colorId"`
		SizeId    string `json:"sizeId"`
		Sku       string `json:"sku"`
		Quantity  int    `json:"quantity"`
	}

	app.AddCustomHandler(module, "createBatch", http.MethodPost, func(c echo.Context) error {
		var dtos []ProductUnitDto

		c.Bind(&dtos)

		for _, dto := range dtos {
			fmt.Printf("%#v", dto)
		}

		collection, err := app.PbApp.Dao().FindCollectionByNameOrId("product_units")
		if err != nil {
			return err
		}

		err = app.PbApp.Dao().RunInTransaction(func(txDao *daos.Dao) error {
			for _, dto := range dtos {
				record := models.NewRecord(collection)

				form := forms.NewRecordUpsert(app.PbApp, record)
				form.SetDao(txDao)

				err := form.LoadData(map[string]any{
					"productId": dto.ProductId,
					"colorId":   dto.ColorId,
					"sizeId":    dto.SizeId,
					"sku":       "sku-todo",
					"quantity":  dto.Quantity,
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

		if err != nil {
			return err
		}

		return c.JSON(200, map[string]int{
			"len": len(dtos),
		})
	})
}
