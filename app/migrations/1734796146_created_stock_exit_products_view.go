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
					"cascadeDelete": false,
					"collectionId": "pbc_2428752909",
					"hidden": false,
					"id": "relation2006250069",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "stockEntryId",
					"presentable": false,
					"required": false,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": true,
					"collectionId": "obfw28bknu15htt",
					"hidden": false,
					"id": "_clone_TnHI",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "movementId",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"cascadeDelete": false,
					"collectionId": "1o8eb05ndq83rht",
					"hidden": false,
					"id": "_clone_pWDF",
					"maxSelect": 1,
					"minSelect": 0,
					"name": "productUnitId",
					"presentable": false,
					"required": true,
					"system": false,
					"type": "relation"
				},
				{
					"hidden": false,
					"id": "_clone_f8fS",
					"max": 999,
					"min": 1,
					"name": "quantity",
					"onlyInt": true,
					"presentable": false,
					"required": true,
					"system": false,
					"type": "number"
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
					"id": "_clone_aiOx",
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
					"id": "_clone_paUu",
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
					"id": "_clone_NKpm",
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
					"id": "_clone_EyMR",
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
					"id": "_clone_ZU2H",
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
					"id": "_clone_HMBD",
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
			"id": "pbc_4143600848",
			"indexes": [],
			"listRule": "@request.auth.id != ''",
			"name": "stock_exit_products_view",
			"system": false,
			"type": "view",
			"updateRule": null,
			"viewQuery": "SELECT\n  (ROW_NUMBER() OVER()) 'id',\n  sout.id 'stockEntryId',\n  sout.` + "`" + `movementId` + "`" + `,\n  sout.` + "`" + `productUnitId` + "`" + `,\n  sout.quantity,\n  p.id 'productId',\n  p.name,\n  p.cost,\n  p.price,\n  pu.` + "`" + `colorName` + "`" + `,\n  pu.` + "`" + `colorHexcode` + "`" + `,\n  pu.` + "`" + `sizeAlias` + "`" + `\nFROM stock_exits sout\n  JOIN product_units_view pu ON pu.id = sout.` + "`" + `productUnitId` + "`" + `\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n",
			"viewRule": "@request.auth.id != ''"
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4143600848")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
