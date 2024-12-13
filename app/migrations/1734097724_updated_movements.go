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

		// remove field
		collection.Fields.RemoveById("date3946532403")

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "ln3myub2",
			"maxSelect": 1,
			"name": "state",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"OPEN",
				"CLOSED",
				"ANNULLED"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("obfw28bknu15htt")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"hidden": false,
			"id": "date3946532403",
			"max": "",
			"min": "",
			"name": "deleted",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "date"
		}`)); err != nil {
			return err
		}

		// update field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "ln3myub2",
			"maxSelect": 1,
			"name": "state",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"OPEN",
				"CLOSED"
			]
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	})
}