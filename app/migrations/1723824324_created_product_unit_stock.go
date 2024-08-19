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
			"id": "dwllhfyiwtkwu84",
			"created": "2024-08-16 16:05:24.057Z",
			"updated": "2024-08-16 16:05:24.057Z",
			"name": "product_unit_stock",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "ztk6kk83",
					"name": "productUnitId",
					"type": "relation",
					"required": false,
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
					"id": "c6dwrzih",
					"name": "quantity",
					"type": "number",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": 0,
						"max": 99999,
						"noDecimal": true
					}
				}
			],
			"indexes": [],
			"listRule": "@request.auth.id != ''",
			"viewRule": "@request.auth.id != ''",
			"createRule": "@request.auth.id != ''",
			"updateRule": "@request.auth.id != ''",
			"deleteRule": "@request.auth.id != ''",
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("dwllhfyiwtkwu84")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
