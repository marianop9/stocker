package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_710825235")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "date4182365711",
			"max": "",
			"min": "",
			"name": "executed",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "text1574812785",
			"max": 300,
			"min": 0,
			"name": "error",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "json3437106334",
			"maxSize": 0,
			"name": "data",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "select2744374011",
			"maxSelect": 1,
			"name": "state",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"PARSED",
				"RUNNING",
				"COMPLETED",
				"FAILED",
				"CANCELED"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_710825235")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("date4182365711")

		// remove field
		collection.Fields.RemoveById("text1574812785")

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"hidden": false,
			"id": "json3437106334",
			"maxSize": 0,
			"name": "output",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "json"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"hidden": false,
			"id": "select2744374011",
			"maxSelect": 1,
			"name": "state",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"PENDING",
				"COMPLETED",
				"CANCELED"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}
