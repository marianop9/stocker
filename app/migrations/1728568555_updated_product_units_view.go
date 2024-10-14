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

		collection, err := dao.FindCollectionByNameOrId("68nud5rhciw8amj")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("jctobkl4")

		// remove
		collection.Schema.RemoveField("zbwv2jac")

		// remove
		collection.Schema.RemoveField("hkxkkjgt")

		// remove
		collection.Schema.RemoveField("9gjxcsxj")

		// remove
		collection.Schema.RemoveField("n2tssdfq")

		// remove
		collection.Schema.RemoveField("vbwb6mjl")

		// remove
		collection.Schema.RemoveField("ygphx5vr")

		// add
		new_productId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "xw2p4zcr",
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
		}`), new_productId); err != nil {
			return err
		}
		collection.Schema.AddField(new_productId)

		// add
		new_colorId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "hsqr9gly",
			"name": "colorId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "qtguurakaklrhpq",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), new_colorId); err != nil {
			return err
		}
		collection.Schema.AddField(new_colorId)

		// add
		new_colorName := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "wz1lrp73",
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
		new_colorHexcode := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "pe8fyczi",
			"name": "colorHexcode",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": "^#(?:[0-9a-fA-F]{3}){1,2}$"
			}
		}`), new_colorHexcode); err != nil {
			return err
		}
		collection.Schema.AddField(new_colorHexcode)

		// add
		new_sizeId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "evovftwn",
			"name": "sizeId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "3tjqwrls9ffdork",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), new_sizeId); err != nil {
			return err
		}
		collection.Schema.AddField(new_sizeId)

		// add
		new_sizeAlias := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "w8uq4hy3",
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

		// add
		new_quantity := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "0fvmigvi",
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

		collection, err := dao.FindCollectionByNameOrId("68nud5rhciw8amj")
		if err != nil {
			return err
		}

		// add
		del_productId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "jctobkl4",
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
		}`), del_productId); err != nil {
			return err
		}
		collection.Schema.AddField(del_productId)

		// add
		del_colorId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "zbwv2jac",
			"name": "colorId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "qtguurakaklrhpq",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), del_colorId); err != nil {
			return err
		}
		collection.Schema.AddField(del_colorId)

		// add
		del_colorName := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "hkxkkjgt",
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
		del_colorHexcode := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "9gjxcsxj",
			"name": "colorHexcode",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": "^#(?:[0-9a-fA-F]{3}){1,2}$"
			}
		}`), del_colorHexcode); err != nil {
			return err
		}
		collection.Schema.AddField(del_colorHexcode)

		// add
		del_sizeId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "n2tssdfq",
			"name": "sizeId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "3tjqwrls9ffdork",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), del_sizeId); err != nil {
			return err
		}
		collection.Schema.AddField(del_sizeId)

		// add
		del_sizeAlias := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "vbwb6mjl",
			"name": "sizeAlias",
			"type": "text",
			"required": true,
			"presentable": false,
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

		// add
		del_quantity := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ygphx5vr",
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
		}`), del_quantity); err != nil {
			return err
		}
		collection.Schema.AddField(del_quantity)

		// remove
		collection.Schema.RemoveField("xw2p4zcr")

		// remove
		collection.Schema.RemoveField("hsqr9gly")

		// remove
		collection.Schema.RemoveField("wz1lrp73")

		// remove
		collection.Schema.RemoveField("pe8fyczi")

		// remove
		collection.Schema.RemoveField("evovftwn")

		// remove
		collection.Schema.RemoveField("w8uq4hy3")

		// remove
		collection.Schema.RemoveField("0fvmigvi")

		return dao.SaveCollection(collection)
	})
}
