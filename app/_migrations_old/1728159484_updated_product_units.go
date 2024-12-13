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

		collection, err := dao.FindCollectionByNameOrId("1o8eb05ndq83rht")
		if err != nil {
			return err
		}

		// add
		new_quantity := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "xsnuhesv",
			"name": "quantity",
			"type": "number",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 0,
				"max": 999999,
				"noDecimal": true
			}
		}`), new_quantity); err != nil {
			return err
		}
		collection.Schema.AddField(new_quantity)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("1o8eb05ndq83rht")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("xsnuhesv")

		return dao.SaveCollection(collection)
	})
}
