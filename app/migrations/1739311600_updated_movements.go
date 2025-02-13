package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("obfw28bknu15htt")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "select2908602461",
			"maxSelect": 1,
			"name": "paymentType",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "select",
			"values": [
				"CASH",
				"CARD",
				"PROMO"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"hidden": false,
			"id": "number3789599758",
			"max": 100,
			"min": 0,
			"name": "discount",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("obfw28bknu15htt")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("select2908602461")

		// remove field
		collection.Fields.RemoveById("number3789599758")

		return app.Save(collection)
	})
}
