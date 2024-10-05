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
			"query": "SELECT pu.id,\n  pu.` + "`" + `productId` + "`" + `,\n  pu.` + "`" + `colorId` + "`" + `,\n  c.name 'colorName',\n  c.hexcode 'colorHexcode',\n  pu.` + "`" + `sizeId` + "`" + `,\n  s.alias 'sizeAlias',\n  pu.quantity\nFROM product_units pu\n  JOIN colors c ON c.id = pu.` + "`" + `colorId` + "`" + `\n  JOIN sizes s ON s.id = pu.` + "`" + `sizeId` + "`" + `"
		}`), &options); err != nil {
			return err
		}
		collection.SetOptions(options)

		// remove
		collection.Schema.RemoveField("mlejakxm")

		// remove
		collection.Schema.RemoveField("oyxfrgoi")

		// remove
		collection.Schema.RemoveField("mowwgq58")

		// remove
		collection.Schema.RemoveField("yfx8kpo3")

		// remove
		collection.Schema.RemoveField("fxaw013k")

		// remove
		collection.Schema.RemoveField("89bv2hlf")

		// add
		new_productId := &schema.SchemaField{}
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
		}`), new_productId); err != nil {
			return err
		}
		collection.Schema.AddField(new_productId)

		// add
		new_colorId := &schema.SchemaField{}
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
		}`), new_colorId); err != nil {
			return err
		}
		collection.Schema.AddField(new_colorId)

		// add
		new_colorName := &schema.SchemaField{}
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
		}`), new_colorName); err != nil {
			return err
		}
		collection.Schema.AddField(new_colorName)

		// add
		new_colorHexcode := &schema.SchemaField{}
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
		}`), new_colorHexcode); err != nil {
			return err
		}
		collection.Schema.AddField(new_colorHexcode)

		// add
		new_sizeId := &schema.SchemaField{}
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
		}`), new_sizeId); err != nil {
			return err
		}
		collection.Schema.AddField(new_sizeId)

		// add
		new_sizeAlias := &schema.SchemaField{}
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
		}`), new_sizeAlias); err != nil {
			return err
		}
		collection.Schema.AddField(new_sizeAlias)

		// add
		new_quantity := &schema.SchemaField{}
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

		options := map[string]any{}
		if err := json.Unmarshal([]byte(`{
			"query": "SELECT pu.id,\n  pu.` + "`" + `productId` + "`" + `,\n  pu.` + "`" + `colorId` + "`" + `,\n  c.name 'colorName',\n  c.hexcode 'colorHexcode',\n  pu.` + "`" + `sizeId` + "`" + `,\n  s.alias 'sizeAlias'\nFROM product_units pu\n  JOIN colors c ON c.id = pu.` + "`" + `colorId` + "`" + `\n  JOIN sizes s ON s.id = pu.` + "`" + `sizeId` + "`" + `"
		}`), &options); err != nil {
			return err
		}
		collection.SetOptions(options)

		// add
		del_productId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "mlejakxm",
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
			"id": "oyxfrgoi",
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
			"id": "mowwgq58",
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
			"id": "yfx8kpo3",
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
			"id": "fxaw013k",
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
			"id": "89bv2hlf",
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

		return dao.SaveCollection(collection)
	})
}
