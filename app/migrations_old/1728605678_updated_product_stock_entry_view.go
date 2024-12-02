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

		options := map[string]any{}
		if err := json.Unmarshal([]byte(`{
			"query": "SELECT\n  (ROW_NUMBER() OVER()) 'id',\n  sin.id 'stockEntryId',\n  sin.` + "`" + `movementId` + "`" + `,\n  sin.` + "`" + `productUnitId` + "`" + `,\n  sin.quantity,\n  p.name,\n  pu.` + "`" + `colorName` + "`" + `,\n  pu.` + "`" + `sizeAlias` + "`" + `\nFROM stock_entries sin\n  JOIN product_units_view pu ON pu.id = sin.` + "`" + `productUnitId` + "`" + `\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n"
		}`), &options); err != nil {
			return err
		}
		collection.SetOptions(options)

		// remove
		collection.Schema.RemoveField("ujabqe4x")

		// remove
		collection.Schema.RemoveField("4gvhsz9y")

		// remove
		collection.Schema.RemoveField("soug0njw")

		// remove
		collection.Schema.RemoveField("3dixkmuz")

		// remove
		collection.Schema.RemoveField("v3ixflws")

		// remove
		collection.Schema.RemoveField("gphaa1dj")

		// add
		new_stockEntryId := &schema.SchemaField{}
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
		}`), new_stockEntryId); err != nil {
			return err
		}
		collection.Schema.AddField(new_stockEntryId)

		// add
		new_movementId := &schema.SchemaField{}
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
		}`), new_movementId); err != nil {
			return err
		}
		collection.Schema.AddField(new_movementId)

		// add
		new_productUnitId := &schema.SchemaField{}
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
		}`), new_productUnitId); err != nil {
			return err
		}
		collection.Schema.AddField(new_productUnitId)

		// add
		new_quantity := &schema.SchemaField{}
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
		}`), new_quantity); err != nil {
			return err
		}
		collection.Schema.AddField(new_quantity)

		// add
		new_name := &schema.SchemaField{}
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
		}`), new_name); err != nil {
			return err
		}
		collection.Schema.AddField(new_name)

		// add
		new_colorName := &schema.SchemaField{}
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
		}`), new_colorName); err != nil {
			return err
		}
		collection.Schema.AddField(new_colorName)

		// add
		new_sizeAlias := &schema.SchemaField{}
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

		options := map[string]any{}
		if err := json.Unmarshal([]byte(`{
			"query": "SELECT\n  sin.id,\n  sin.` + "`" + `movementId` + "`" + `,\n  sin.` + "`" + `productUnitId` + "`" + `,\n  sin.quantity,\n  p.name,\n  pu.` + "`" + `colorName` + "`" + `,\n  pu.` + "`" + `sizeAlias` + "`" + `\nFROM stock_entries sin\n  JOIN product_units_view pu ON pu.id = sin.` + "`" + `productUnitId` + "`" + `\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n"
		}`), &options); err != nil {
			return err
		}
		collection.SetOptions(options)

		// add
		del_movementId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ujabqe4x",
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
			"id": "4gvhsz9y",
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
			"id": "soug0njw",
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
			"id": "3dixkmuz",
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
			"id": "v3ixflws",
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
			"id": "gphaa1dj",
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

		return dao.SaveCollection(collection)
	})
}
