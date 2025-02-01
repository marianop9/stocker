package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("imv01buv3cinry7")
		if err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1022373260",
			"hidden": false,
			"id": "relation115655840",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "materialId",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1574068377",
			"hidden": false,
			"id": "relation896131332",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "clothingTypeId",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("imv01buv3cinry7")
		if err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("relation115655840")

		// remove field
		collection.Fields.RemoveById("relation896131332")

		return app.Save(collection)
	})
}
