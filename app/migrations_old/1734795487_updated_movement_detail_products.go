package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2030967632")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT\n    (CASE m.type\n        WHEN 'IN' THEN sin.id\n        ELSE sout.id\n    END) AS 'id',\n    m.type,\n    m.id 'movementId',\n    iif(m.type = 'IN', sin.` + "`" + `productUnitId` + "`" + `, sout.` + "`" + `productUnitId` + "`" + `) 'productUnitId',\n    iif(m.type = 'IN', sin.` + "`" + `quantity` + "`" + `, sout.` + "`" + `quantity` + "`" + `) 'quantity',\n    p.id 'productId',\n    p.name,\n    p.cost,\n    p.price,\n    pu.` + "`" + `colorName` + "`" + `,\n    pu.` + "`" + `colorHexcode` + "`" + `,\n    pu.` + "`" + `sizeAlias` + "`" + `\nFROM movements m\n  LEFT JOIN stock_entries sin ON sin.` + "`" + `movementId` + "`" + ` = m.id\n  LEFT JOIN stock_exits sout ON sout.` + "`" + `movementId` + "`" + ` = m.id  \n  JOIN product_units_view pu ON (m.type = 'IN' AND pu.id = sin.` + "`" + `productUnitId` + "`" + `) OR (m.type = 'OUT' AND pu.id = sout.` + "`" + `productUnitId` + "`" + `)\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_A0U9")

		// remove field
		collection.Fields.RemoveById("_clone_wZvg")

		// remove field
		collection.Fields.RemoveById("_clone_gcJ4")

		// remove field
		collection.Fields.RemoveById("_clone_bI7R")

		// remove field
		collection.Fields.RemoveById("_clone_aEmf")

		// remove field
		collection.Fields.RemoveById("_clone_m8lP")

		// remove field
		collection.Fields.RemoveById("_clone_tTld")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_Vtzi",
			"maxSelect": 1,
			"name": "type",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"IN",
				"OUT"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_1XhQ",
			"max": 50,
			"min": 3,
			"name": "name",
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
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "_clone_eHUr",
			"max": 999999,
			"min": 0,
			"name": "cost",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "_clone_24nB",
			"max": 999999,
			"min": 0,
			"name": "price",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_qz9A",
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
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_TDGb",
			"max": 0,
			"min": 0,
			"name": "colorHexcode",
			"pattern": "^#(?:[0-9a-fA-F]{3}){1,2}$",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_R51F",
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

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2030967632")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT\n    (CASE m.type\n        WHEN 'IN' THEN sin.id\n        ELSE sout.id\n    END) AS 'id',\n    m.type,\n    m.id 'movementId',\n    iif(m.type = 'IN', sin.` + "`" + `productUnitId` + "`" + `, sout.` + "`" + `productUnitId` + "`" + `) 'productUnitId',\n    iif(m.type = 'IN', sin.` + "`" + `quantity` + "`" + `, sout.` + "`" + `quantity` + "`" + `) 'quantity',\n    p.id 'productId',\n    p.name,\n    p.cost,\n    p.price,\n    pu.` + "`" + `colorName` + "`" + `,\n    pu.` + "`" + `colorHexcode` + "`" + `,\n    pu.` + "`" + `sizeAlias` + "`" + `\nFROM movements m\n  LEFT JOIN stock_entries sin ON sin.` + "`" + `movementId` + "`" + ` = m.id\n  LEFT JOIN stock_exits sout ON sout.` + "`" + `movementId` + "`" + ` = m.id  \n  JOIN product_units_view pu ON (m.type = 'IN' AND pu.id = sin.` + "`" + `productUnitId` + "`" + `) OR (sout.` + "`" + `productUnitId` + "`" + ` != NULL AND pu.id = sout.` + "`" + `productUnitId` + "`" + `)\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_A0U9",
			"maxSelect": 1,
			"name": "type",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "select",
			"values": [
				"IN",
				"OUT"
			]
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_wZvg",
			"max": 50,
			"min": 3,
			"name": "name",
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
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "_clone_gcJ4",
			"max": 999999,
			"min": 0,
			"name": "cost",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "_clone_bI7R",
			"max": 999999,
			"min": 0,
			"name": "price",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_aEmf",
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
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_m8lP",
			"max": 0,
			"min": 0,
			"name": "colorHexcode",
			"pattern": "^#(?:[0-9a-fA-F]{3}){1,2}$",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_tTld",
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

		// remove field
		collection.Fields.RemoveById("_clone_Vtzi")

		// remove field
		collection.Fields.RemoveById("_clone_1XhQ")

		// remove field
		collection.Fields.RemoveById("_clone_eHUr")

		// remove field
		collection.Fields.RemoveById("_clone_24nB")

		// remove field
		collection.Fields.RemoveById("_clone_qz9A")

		// remove field
		collection.Fields.RemoveById("_clone_TDGb")

		// remove field
		collection.Fields.RemoveById("_clone_R51F")

		return app.Save(collection)
	})
}
