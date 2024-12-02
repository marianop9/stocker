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

		options := map[string]any{}
		if err := json.Unmarshal([]byte(`{
			"query": "SELECT pu.id,\n  pu.` + "`" + `productId` + "`" + `,\n  pu.` + "`" + `colorId` + "`" + `,\n  c.name 'colorName',\n  c.hexcode 'colorHexcode',\n  pu.` + "`" + `sizeId` + "`" + `,\n  s.alias 'sizeAlias'\nFROM product_units pu\n  JOIN colors c ON c.id = pu.` + "`" + `colorId` + "`" + `\n  JOIN sizes s ON s.id = pu.` + "`" + `sizeId` + "`" + `"
		}`), &options); err != nil {
			return err
		}
		collection.SetOptions(options)

		// remove
		collection.Schema.RemoveField("vszmkszn")

		// remove
		collection.Schema.RemoveField("t8xnkr4l")

		// remove
		collection.Schema.RemoveField("xnsoak9k")

		// remove
		collection.Schema.RemoveField("plu21i3s")

		// remove
		collection.Schema.RemoveField("ezshuchk")

		// remove
		collection.Schema.RemoveField("ypalrasu")

		// add
		new_productId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "kdsoidar",
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
			"id": "96xnivd5",
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
			"id": "d22jpilv",
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
			"id": "91fg6eey",
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
			"id": "ct9fngfg",
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
			"id": "shr26qwj",
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
		}`), new_sizeAlias); err != nil {
			return err
		}
		collection.Schema.AddField(new_sizeAlias)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("68nud5rhciw8amj")
		if err != nil {
			return err
		}

		options := map[string]any{}
		if err := json.Unmarshal([]byte(`{
			"query": "SELECT pu.id,\n  pu.` + "`" + `productId` + "`" + `,\n  pu.` + "`" + `colorId` + "`" + `,\n  c.name,\n  c.hexcode,\n  pu.` + "`" + `sizeId` + "`" + `,\n  s.alias\nFROM product_units pu\n  JOIN colors c ON c.id = pu.` + "`" + `colorId` + "`" + `\n  JOIN sizes s ON s.id = pu.` + "`" + `sizeId` + "`" + `"
		}`), &options); err != nil {
			return err
		}
		collection.SetOptions(options)

		// add
		del_productId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "vszmkszn",
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
			"id": "t8xnkr4l",
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
		del_name := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "xnsoak9k",
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
		del_hexcode := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "plu21i3s",
			"name": "hexcode",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": "^#(?:[0-9a-fA-F]{3}){1,2}$"
			}
		}`), del_hexcode); err != nil {
			return err
		}
		collection.Schema.AddField(del_hexcode)

		// add
		del_sizeId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ezshuchk",
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
		del_alias := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ypalrasu",
			"name": "alias",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 1,
				"max": 5,
				"pattern": ""
			}
		}`), del_alias); err != nil {
			return err
		}
		collection.Schema.AddField(del_alias)

		// remove
		collection.Schema.RemoveField("kdsoidar")

		// remove
		collection.Schema.RemoveField("96xnivd5")

		// remove
		collection.Schema.RemoveField("d22jpilv")

		// remove
		collection.Schema.RemoveField("91fg6eey")

		// remove
		collection.Schema.RemoveField("ct9fngfg")

		// remove
		collection.Schema.RemoveField("shr26qwj")

		return dao.SaveCollection(collection)
	})
}
