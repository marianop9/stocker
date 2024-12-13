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

		collection, err := dao.FindCollectionByNameOrId("54vt638696x6y3w")
		if err != nil {
			return err
		}

		collection.Name = "stock_entry_products_view"

		// remove
		collection.Schema.RemoveField("gqt12tpb")

		// remove
		collection.Schema.RemoveField("vlfzd9k5")

		// remove
		collection.Schema.RemoveField("8mwazobv")

		// remove
		collection.Schema.RemoveField("xy5r8n0a")

		// remove
		collection.Schema.RemoveField("dhfshoqo")

		// remove
		collection.Schema.RemoveField("hwhyx1ve")

		// remove
		collection.Schema.RemoveField("b0o60g1l")

		// add
		new_stockEntryId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "95oorogw",
			"name": "stockEntryId",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "h0l22n1uyldvp3g",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), new_stockEntryId); err != nil {
			return err
		}
		collection.Schema.AddField(new_stockEntryId)

		// add
		new_movementId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ejqcmmpn",
			"name": "movementId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "obfw28bknu15htt",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), new_movementId); err != nil {
			return err
		}
		collection.Schema.AddField(new_movementId)

		// add
		new_productUnitId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "hmtroaxe",
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
		}`), new_productUnitId); err != nil {
			return err
		}
		collection.Schema.AddField(new_productUnitId)

		// add
		new_quantity := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "j0ze63l2",
			"name": "quantity",
			"type": "number",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 1,
				"max": 999,
				"noDecimal": true
			}
		}`), new_quantity); err != nil {
			return err
		}
		collection.Schema.AddField(new_quantity)

		// add
		new_name := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "wvdrenri",
			"name": "name",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 3,
				"max": 50,
				"pattern": ""
			}
		}`), new_name); err != nil {
			return err
		}
		collection.Schema.AddField(new_name)

		// add
		new_colorName := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "3flatx1o",
			"name": "colorName",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 3,
				"max": 50,
				"pattern": ""
			}
		}`), new_colorName); err != nil {
			return err
		}
		collection.Schema.AddField(new_colorName)

		// add
		new_sizeAlias := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ucatocap",
			"name": "sizeAlias",
			"type": "text",
			"required": true,
			"presentable": true,
			"unique": false,
			"options": {
				"min": 1,
				"max": 5,
				"pattern": ""
			}
		}`), new_sizeAlias); err != nil {
			return err
		}
		collection.Schema.AddField(new_sizeAlias)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("54vt638696x6y3w")
		if err != nil {
			return err
		}

		collection.Name = "product_stock_entry_view"

		// add
		del_stockEntryId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "gqt12tpb",
			"name": "stockEntryId",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "h0l22n1uyldvp3g",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), del_stockEntryId); err != nil {
			return err
		}
		collection.Schema.AddField(del_stockEntryId)

		// add
		del_movementId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "vlfzd9k5",
			"name": "movementId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "obfw28bknu15htt",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), del_movementId); err != nil {
			return err
		}
		collection.Schema.AddField(del_movementId)

		// add
		del_productUnitId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "8mwazobv",
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
		}`), del_productUnitId); err != nil {
			return err
		}
		collection.Schema.AddField(del_productUnitId)

		// add
		del_quantity := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "xy5r8n0a",
			"name": "quantity",
			"type": "number",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 1,
				"max": 999,
				"noDecimal": true
			}
		}`), del_quantity); err != nil {
			return err
		}
		collection.Schema.AddField(del_quantity)

		// add
		del_name := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "dhfshoqo",
			"name": "name",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 3,
				"max": 50,
				"pattern": ""
			}
		}`), del_name); err != nil {
			return err
		}
		collection.Schema.AddField(del_name)

		// add
		del_colorName := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "hwhyx1ve",
			"name": "colorName",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 3,
				"max": 50,
				"pattern": ""
			}
		}`), del_colorName); err != nil {
			return err
		}
		collection.Schema.AddField(del_colorName)

		// add
		del_sizeAlias := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "b0o60g1l",
			"name": "sizeAlias",
			"type": "text",
			"required": true,
			"presentable": true,
			"unique": false,
			"options": {
				"min": 1,
				"max": 5,
				"pattern": ""
			}
		}`), del_sizeAlias); err != nil {
			return err
		}
		collection.Schema.AddField(del_sizeAlias)

		// remove
		collection.Schema.RemoveField("95oorogw")

		// remove
		collection.Schema.RemoveField("ejqcmmpn")

		// remove
		collection.Schema.RemoveField("hmtroaxe")

		// remove
		collection.Schema.RemoveField("j0ze63l2")

		// remove
		collection.Schema.RemoveField("wvdrenri")

		// remove
		collection.Schema.RemoveField("3flatx1o")

		// remove
		collection.Schema.RemoveField("ucatocap")

		return dao.SaveCollection(collection)
	})
}
