package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		jsonData := `{
			"createRule": null,
			"deleteRule": null,
			"fields": [
				{
					"autogeneratePattern": "",
					"hidden": false,
					"id": "text3208210256",
					"max": 0,
					"min": 0,
					"name": "id",
					"pattern": "^[a-z0-9]+$",
					"presentable": false,
					"primaryKey": true,
					"required": true,
					"system": true,
					"type": "text"
				},
				{
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
				},
				{
					"cascadeDelete": false,
					"collectionId": "obfw28bknu15htt",
					"hidden": false,
					"id": "relation4045776798",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "movementId",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "json2656390915",
					"maxSize": 1,
					"name": "productUnitId",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"hidden": false,
					"id": "json2683508278",
					"maxSize": 1,
					"name": "quantity",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "json"
				},
				{
					"cascadeDelete": false,
					"collectionId": "imv01buv3cinry7",
					"hidden": false,
					"id": "relation913937925",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "productId",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				}
			],
			"id": "pbc_2030967632",
			"indexes": [],
			"listRule": null,
			"name": "movement_detail_products",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "SELECT\n    (CASE m.type\n        WHEN 'IN' THEN sin.id\n        ELSE sout.id\n    END) AS 'id',\n    m.type,\n    m.id 'movementId',\n    iif(m.type = 'IN', sin.` + "`" + `productUnitId` + "`" + `, sout.` + "`" + `productUnitId` + "`" + `) 'productUnitId',\n    iif(m.type = 'IN', sin.` + "`" + `quantity` + "`" + `, sout.` + "`" + `quantity` + "`" + `) 'quantity',\n    p.id 'productId',\n    p.name,\n    p.cost,\n    p.price,\n    pu.` + "`" + `colorName` + "`" + `,\n    pu.` + "`" + `colorHexcode` + "`" + `,\n    pu.` + "`" + `sizeAlias` + "`" + `\nFROM movements m\n  LEFT JOIN stock_entries sin ON sin.` + "`" + `movementId` + "`" + ` = m.id\n  LEFT JOIN stock_exits sout ON sout.` + "`" + `movementId` + "`" + ` = m.id  \n  JOIN product_units_view pu ON pu.id = sin.` + "`" + `productUnitId` + "`" + `\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n",
			"viewRule": null
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2030967632")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
