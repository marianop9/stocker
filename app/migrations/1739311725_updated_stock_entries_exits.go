package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		stockExits, err := app.FindCollectionByNameOrId("pbc_2428752909")
		if err != nil {
			return err
		}

		// add field
		if err := stockExits.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number1633542041",
			"max": 100,
			"min": 0,
			"name": "specialDiscount",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		if err := app.Save(stockExits); err != nil {
			return err
		}

		stockEntries, err := app.FindCollectionByNameOrId("h0l22n1uyldvp3g")
		if err != nil {
			return err
		}

		// add field
		if err := stockEntries.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "number1633542041",
			"max": 100,
			"min": 0,
			"name": "specialDiscount",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		return app.Save(stockEntries)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2428752909")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("number1633542041")
		if err := app.Save(collection); err != nil {
			return err
		}

		stockEntries, err := app.FindCollectionByNameOrId("h0l22n1uyldvp3g")
		if err != nil {
			return err
		}

		// remove field
		stockEntries.Fields.RemoveById("number1633542041")

		return app.Save(stockEntries)
	})
}
