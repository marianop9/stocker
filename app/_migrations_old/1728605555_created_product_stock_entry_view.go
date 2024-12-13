package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "54vt638696x6y3w",
			"created": "2024-10-11 00:12:35.637Z",
			"updated": "2024-10-11 00:12:35.637Z",
			"name": "product_stock_entry_view",
			"type": "view",
			"system": false,
			"schema": [
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
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
				}
			],
			"indexes": [],
			"listRule": "@request.auth.id != ''",
			"viewRule": "@request.auth.id != ''",
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
			"options": {
				"query": "SELECT\n  sin.id,\n  sin.` + "`" + `movementId` + "`" + `,\n  sin.` + "`" + `productUnitId` + "`" + `,\n  sin.quantity,\n  p.name,\n  pu.` + "`" + `colorName` + "`" + `,\n  pu.` + "`" + `sizeAlias` + "`" + `\nFROM stock_entries sin\n  JOIN product_units_view pu ON pu.id = sin.` + "`" + `productUnitId` + "`" + `\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n"
			}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("54vt638696x6y3w")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
