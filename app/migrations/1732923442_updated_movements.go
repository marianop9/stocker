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
		new_state := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ln3myub2",
			"name": "state",
			"type": "select",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"values": [
					"OPEN",
					"CLOSED"
				]
			}
		}`), new_state); err != nil {
			return err
		}
		collection.Schema.AddField(new_state)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("obfw28bknu15htt")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("ln3myub2")

		return dao.SaveCollection(collection)
	})
}
