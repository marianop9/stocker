package products

import (
	"fmt"
	"net/http"

	"github.com/marianop9/stocker/app/stocker"
	"github.com/marianop9/stocker/app/stocker/utils"
	"github.com/pocketbase/pocketbase/core"
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

	app.AddCustomHandler(module, "createBatch", http.MethodPost, func(e *core.RequestEvent) error {
		var dtos []ProductUnitDto

		e.BindBody(&dtos)

		for _, dto := range dtos {
			fmt.Printf("%#v", dto)
		}

		collection, err := app.PbApp.FindCollectionByNameOrId("product_units")
		if err != nil {
			return err
		}

		err = app.PbApp.RunInTransaction(func(txApp core.App) error {
			for _, dto := range dtos {
				record := core.NewRecord(collection)

				record.Load(map[string]any{
					"productId": dto.ProductId,
					"colorId":   dto.ColorId,
					"sizeId":    dto.SizeId,
					"sku":       "sku-todo",
					"quantity":  dto.Quantity,
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

		return e.JSON(200, map[string]int{
			"len": len(dtos),
		})
	})
}
