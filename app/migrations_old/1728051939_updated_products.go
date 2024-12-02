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

		collection, err := dao.FindCollectionByNameOrId("imv01buv3cinry7")
		if err != nil {
			return err
		}

		// add
		new_cost := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "91amntgk",
			"name": "cost",
			"type": "number",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 0,
				"max": 999999,
				"noDecimal": false
			}
		}`), new_cost); err != nil {
			return err
		}
		collection.Schema.AddField(new_cost)

		// add
		new_price := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "xytbisdd",
			"name": "price",
			"type": "number",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 0,
				"max": 999999,
				"noDecimal": false
			}
		}`), new_price); err != nil {
			return err
		}
		collection.Schema.AddField(new_price)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("imv01buv3cinry7")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("91amntgk")

		// remove
		collection.Schema.RemoveField("xytbisdd")

		return dao.SaveCollection(collection)
	})
}
