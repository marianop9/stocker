package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		jsonData := `{
			"createRule": "@request.auth.id != ''",
			"deleteRule": "@request.auth.id != ''",
			"fields": [
				{
					"autogeneratePattern": "[a-z0-9]{15}",
					"hidden": false,
					"id": "text3208210256",
					"max": 15,
					"min": 15,
					"name": "id",
					"pattern": "^[a-z0-9]+$",
					"presentable": false,
					"primaryKey": true,
					"required": true,
					"system": true,
					"type": "text"
				},
				{
					"cascadeDelete": true,
					"collectionId": "obfw28bknu15htt",
					"hidden": false,
					"id": "relation4045776798",
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
					"id": "relation2656390915",
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
					"id": "number2683508278",
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
					"hidden": false,
					"id": "autodate2990389176",
					"name": "created",
					"onCreate": true,
					"onUpdate": false,
					"presentable": false,
					"system": false,
					"type": "autodate"
				},
				{
					"hidden": false,
					"id": "autodate3332085495",
					"name": "updated",
					"onCreate": true,
					"onUpdate": true,
					"presentable": false,
					"system": false,
					"type": "autodate"
				}
			],
			"id": "pbc_2428752909",
			"indexes": [],
			"listRule": "@request.auth.id != ''",
			"name": "stock_exits",
			"system": false,
			"type": "base",
			"updateRule": "@request.auth.id != ''",
			"viewRule": "@request.auth.id != ''"
		}`

		collection := &core.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_2428752909")
		if err != nil {
			return err
		}

		return app.Delete(collection)
	})
}
