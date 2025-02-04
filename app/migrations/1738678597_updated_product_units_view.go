package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("68nud5rhciw8amj")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT pu.id,\n  pu.` + "`" + `productId` + "`" + `,\n  pu.` + "`" + `colorId` + "`" + `,\n  c.name 'colorName',\n  c.hexcode 'colorHexcode',\n  pu.` + "`" + `sizeId` + "`" + `,\n  s.name 'sizeName',\n  pu.quantity\nFROM product_units pu\n  JOIN colors c ON c.id = pu.` + "`" + `colorId` + "`" + `\n  JOIN sizes s ON s.id = pu.` + "`" + `sizeId` + "`" + `"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_7eNJ")

		// remove field
		collection.Fields.RemoveById("_clone_enx6")

		// remove field
		collection.Fields.RemoveById("_clone_bCtl")

		// remove field
		collection.Fields.RemoveById("_clone_r3YG")

		// remove field
		collection.Fields.RemoveById("_clone_1sd6")

		// remove field
		collection.Fields.RemoveById("_clone_EjnK")

		// remove field
		collection.Fields.RemoveById("_clone_uXDP")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "imv01buv3cinry7",
			"hidden": false,
			"id": "_clone_K1oB",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "productId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"cascadeDelete": false,
			"collectionId": "qtguurakaklrhpq",
			"hidden": false,
			"id": "_clone_cSDd",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "colorId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_1KYL",
			"max": 50,
			"min": 3,
			"name": "colorName",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_AjFU",
			"max": 0,
			"min": 0,
			"name": "colorHexcode",
			"pattern": "^#(?:[0-9a-fA-F]{3}){1,2}$",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"cascadeDelete": false,
			"collectionId": "3tjqwrls9ffdork",
			"hidden": false,
			"id": "_clone_AII1",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "sizeId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_iUrL",
			"max": 5,
			"min": 1,
			"name": "sizeName",
			"pattern": "",
			"presentable": true,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "_clone_ttEZ",
			"max": 999999,
			"min": 0,
			"name": "quantity",
			"onlyInt": true,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("68nud5rhciw8amj")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT pu.id,\n  pu.` + "`" + `productId` + "`" + `,\n  pu.` + "`" + `colorId` + "`" + `,\n  c.name 'colorName',\n  c.hexcode 'colorHexcode',\n  pu.` + "`" + `sizeId` + "`" + `,\n  s.alias 'sizeAlias',\n  pu.quantity\nFROM product_units pu\n  JOIN colors c ON c.id = pu.` + "`" + `colorId` + "`" + `\n  JOIN sizes s ON s.id = pu.` + "`" + `sizeId` + "`" + `"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"cascadeDelete": false,
			"collectionId": "imv01buv3cinry7",
			"hidden": false,
			"id": "_clone_7eNJ",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "productId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"cascadeDelete": false,
			"collectionId": "qtguurakaklrhpq",
			"hidden": false,
			"id": "_clone_enx6",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "colorId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_bCtl",
			"max": 50,
			"min": 3,
			"name": "colorName",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_r3YG",
			"max": 0,
			"min": 0,
			"name": "colorHexcode",
			"pattern": "^#(?:[0-9a-fA-F]{3}){1,2}$",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"cascadeDelete": false,
			"collectionId": "3tjqwrls9ffdork",
			"hidden": false,
			"id": "_clone_1sd6",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "sizeId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_EjnK",
			"max": 5,
			"min": 1,
			"name": "sizeAlias",
			"pattern": "",
			"presentable": true,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "_clone_uXDP",
			"max": 999999,
			"min": 0,
			"name": "quantity",
			"onlyInt": true,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_K1oB")

		// remove field
		collection.Fields.RemoveById("_clone_cSDd")

		// remove field
		collection.Fields.RemoveById("_clone_1KYL")

		// remove field
		collection.Fields.RemoveById("_clone_AjFU")

		// remove field
		collection.Fields.RemoveById("_clone_AII1")

		// remove field
		collection.Fields.RemoveById("_clone_iUrL")

		// remove field
		collection.Fields.RemoveById("_clone_ttEZ")

		return app.Save(collection)
	})
}
