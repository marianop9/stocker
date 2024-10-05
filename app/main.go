package main

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/labstack/echo/v5"
	_ "github.com/marianop9/stocker/app/migrations"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	// loosely check if it was executed using "go run"
	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		// enable auto creation of migration files when making collection changes in the Admin UI
		// (the isGoRun check is to enable it only during development)
		Automigrate: isGoRun,
	})

	setEndpoints(app)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

type ProductUnitDto struct {
	ProductId string `json:"productId"`
	ColorId   string `json:"colorId"`
	SizeId    string `json:"sizeId"`
	Quantity  int    `json:"quantity"`
}

func setEndpoints(app *pocketbase.PocketBase) {
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {

		e.Router.POST("api/custom/productUnits/createBatch", func(c echo.Context) error {
			var dtos []ProductUnitDto

			c.Bind(&dtos)

			for _, dto := range dtos {
				fmt.Printf("%#v", dto)
			}

			collection, err := app.Dao().FindCollectionByNameOrId("product_units")
			if err != nil {
				return err
			}

			err = app.Dao().RunInTransaction(func(txDao *daos.Dao) error {
				for _, dto := range dtos {
					record := models.NewRecord(collection)

					form := forms.NewRecordUpsert(app, record)
					form.SetDao(txDao)

					form.LoadData(map[string]any{
						"productId": dto.ProductId,
						"colorId":   dto.ColorId,
						"sizeId":    dto.SizeId,
						"sku":       "sku-todo",
						"quantity":  dto.Quantity,
					})

					if err := form.Submit(); err != nil {
						return err
					}
				}

				return nil
			})

			if err != nil {
				return err
			}
			return c.JSON(200, map[string]bool{"success": true})

		}, apis.RequireAdminOrRecordAuth("users"))

		return nil
	})
}
