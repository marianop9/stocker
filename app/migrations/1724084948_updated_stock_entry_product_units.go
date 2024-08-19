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

		collection, err := dao.FindCollectionByNameOrId("ut8a8sbw7plfgj6")
		if err != nil {
			return err
		}

		// update
		edit_stockEntryProductId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "5notoi40",
			"name": "stockEntryProductId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "slmydb7flatz0r9",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_stockEntryProductId); err != nil {
			return err
		}
		collection.Schema.AddField(edit_stockEntryProductId)

		// update
		edit_productUnitId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "jyri0ara",
			"name": "productUnitId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "1o8eb05ndq83rht",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_productUnitId); err != nil {
			return err
		}
		collection.Schema.AddField(edit_productUnitId)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("ut8a8sbw7plfgj6")
		if err != nil {
			return err
		}

		// update
		edit_stockEntryProductId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "5notoi40",
			"name": "stock_entry_product_id",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "slmydb7flatz0r9",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_stockEntryProductId); err != nil {
			return err
		}
		collection.Schema.AddField(edit_stockEntryProductId)

		// update
		edit_productUnitId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "jyri0ara",
			"name": "product_unit_id",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "1o8eb05ndq83rht",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), edit_productUnitId); err != nil {
			return err
		}
		collection.Schema.AddField(edit_productUnitId)

		return dao.SaveCollection(collection)
	})
}
