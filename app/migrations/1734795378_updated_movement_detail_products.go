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
			"viewQuery": "SELECT\n    (CASE m.type\n        WHEN 'IN' THEN sin.id\n        ELSE sout.id\n    END) AS 'id',\n    m.type,\n    m.id 'movementId',\n    iif(m.type = 'IN', sin.` + "`" + `productUnitId` + "`" + `, sout.` + "`" + `productUnitId` + "`" + `) 'productUnitId',\n    iif(m.type = 'IN', sin.` + "`" + `quantity` + "`" + `, sout.` + "`" + `quantity` + "`" + `) 'quantity',\n    p.id 'productId',\n    p.name,\n    p.cost,\n    p.price,\n    pu.` + "`" + `colorName` + "`" + `,\n    pu.` + "`" + `colorHexcode` + "`" + `,\n    pu.` + "`" + `sizeAlias` + "`" + `\nFROM movements m\n  LEFT JOIN stock_entries sin ON sin.` + "`" + `movementId` + "`" + ` = m.id\n  LEFT JOIN stock_exits sout ON sout.` + "`" + `movementId` + "`" + ` = m.id  \n  JOIN product_units_view pu ON (sin.` + "`" + `productUnitId` + "`" + ` != NULL AND pu.id = sin.` + "`" + `productUnitId` + "`" + `) OR (sout.` + "`" + `productUnitId` + "`" + ` != NULL AND pu.id = sout.` + "`" + `productUnitId` + "`" + `)\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_QmM5")

		// remove field
		collection.Fields.RemoveById("_clone_ON2c")

		// remove field
		collection.Fields.RemoveById("_clone_PRaR")

		// remove field
		collection.Fields.RemoveById("_clone_9tLT")

		// remove field
		collection.Fields.RemoveById("_clone_JtwD")

		// remove field
		collection.Fields.RemoveById("_clone_HLJc")

		// remove field
		collection.Fields.RemoveById("_clone_qyGR")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_LXpE",
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
			"id": "_clone_6KSP",
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
			"id": "_clone_15mp",
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
			"id": "_clone_a91f",
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
			"id": "_clone_fe9K",
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
			"id": "_clone_m59p",
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
			"id": "_clone_H9on",
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
			"viewQuery": "SELECT\n    (CASE m.type\n        WHEN 'IN' THEN sin.id\n        ELSE sout.id\n    END) AS 'id',\n    m.type,\n    m.id 'movementId',\n    iif(m.type = 'IN', sin.` + "`" + `productUnitId` + "`" + `, sout.` + "`" + `productUnitId` + "`" + `) 'productUnitId',\n    iif(m.type = 'IN', sin.` + "`" + `quantity` + "`" + `, sout.` + "`" + `quantity` + "`" + `) 'quantity',\n    p.id 'productId',\n    p.name,\n    p.cost,\n    p.price,\n    pu.` + "`" + `colorName` + "`" + `,\n    pu.` + "`" + `colorHexcode` + "`" + `,\n    pu.` + "`" + `sizeAlias` + "`" + `\nFROM movements m\n  LEFT JOIN stock_entries sin ON sin.` + "`" + `movementId` + "`" + ` = m.id\n  LEFT JOIN stock_exits sout ON sout.` + "`" + `movementId` + "`" + ` = m.id  \n  JOIN product_units_view pu ON pu.id = sin.` + "`" + `productUnitId` + "`" + `\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"hidden": false,
			"id": "_clone_QmM5",
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
			"id": "_clone_ON2c",
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
			"id": "_clone_PRaR",
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
			"id": "_clone_9tLT",
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
			"id": "_clone_JtwD",
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
			"id": "_clone_HLJc",
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
			"id": "_clone_qyGR",
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
		collection.Fields.RemoveById("_clone_LXpE")

		// remove field
		collection.Fields.RemoveById("_clone_6KSP")

		// remove field
		collection.Fields.RemoveById("_clone_15mp")

		// remove field
		collection.Fields.RemoveById("_clone_a91f")

		// remove field
		collection.Fields.RemoveById("_clone_fe9K")

		// remove field
		collection.Fields.RemoveById("_clone_m59p")

		// remove field
		collection.Fields.RemoveById("_clone_H9on")

		return app.Save(collection)
	})
}
