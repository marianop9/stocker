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

		collection, err := dao.FindCollectionByNameOrId("slmydb7flatz0r9")
		if err != nil {
			return err
		}

		// update
		edit_stockEntryId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "eibylbxl",
			"name": "stockEntryId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "1ux2c9xpo2jwl7q",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_stockEntryId); err != nil {
			return err
		}
		collection.Schema.AddField(edit_stockEntryId)

		// update
		edit_productId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "cavhydwp",
			"name": "productId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "imv01buv3cinry7",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_productId); err != nil {
			return err
		}
		collection.Schema.AddField(edit_productId)

		// update
		edit_unitPrice := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "zfnlxs5g",
			"name": "unitPrice",
			"type": "number",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": 999999,
				"noDecimal": false
			}
		}`), edit_unitPrice); err != nil {
			return err
		}
		collection.Schema.AddField(edit_unitPrice)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("slmydb7flatz0r9")
		if err != nil {
			return err
		}

		// update
		edit_stockEntryId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "eibylbxl",
			"name": "stock_entry_id",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "1ux2c9xpo2jwl7q",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_stockEntryId); err != nil {
			return err
		}
		collection.Schema.AddField(edit_stockEntryId)

		// update
		edit_productId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "cavhydwp",
			"name": "product_id",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "imv01buv3cinry7",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_productId); err != nil {
			return err
		}
		collection.Schema.AddField(edit_productId)

		// update
		edit_unitPrice := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "zfnlxs5g",
			"name": "unit_price",
			"type": "number",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": 999999,
				"noDecimal": false
			}
		}`), edit_unitPrice); err != nil {
			return err
		}
		collection.Schema.AddField(edit_unitPrice)

		return dao.SaveCollection(collection)
	})
}
