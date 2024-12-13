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
			"id": "68nud5rhciw8amj",
			"created": "2024-08-16 15:22:17.139Z",
			"updated": "2024-08-16 15:22:17.139Z",
			"name": "product_units_view",
			"type": "view",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "cybdxv6z",
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
				},
				{
					"system": false,
					"id": "p8xommsd",
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
				},
				{
					"system": false,
					"id": "pb6tlb2n",
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
					"id": "zaqyvlpv",
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
				},
				{
					"system": false,
					"id": "2qazpscs",
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
				},
				{
					"system": false,
					"id": "j2rd6owl",
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
				}
			],
			"indexes": [],
			"listRule": "@request.auth.id != ''",
			"viewRule": "@request.auth.id != ''",
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
			"options": {
				"query": "SELECT pu.id,\n  pu.` + "`" + `productId` + "`" + `,\n  pu.` + "`" + `colorId` + "`" + `,\n  c.name,\n  c.hexcode,\n  pu.` + "`" + `sizeId` + "`" + `,\n  s.alias\nFROM product_units pu\n  JOIN colors c ON c.id = pu.` + "`" + `colorId` + "`" + `\n  JOIN sizes s ON s.id = pu.` + "`" + `sizeId` + "`" + `"
			}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("68nud5rhciw8amj")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
