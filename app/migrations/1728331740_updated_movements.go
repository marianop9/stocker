package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("obfw28bknu15htt")
		if err != nil {
			return err
		}

		// add
		new_reference := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "yrwufkzw",
			"name": "reference",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": 200,
				"pattern": ""
			}
		}`), new_reference); err != nil {
			return err
		}
		collection.Schema.AddField(new_reference)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("obfw28bknu15htt")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("yrwufkzw")

		return dao.SaveCollection(collection)
	})
}
