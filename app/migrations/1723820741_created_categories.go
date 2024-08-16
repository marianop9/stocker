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
			"id": "hpcu9it5k4fm36i",
			"created": "2024-08-16 15:05:41.573Z",
			"updated": "2024-08-16 15:05:41.573Z",
			"name": "categories",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "zddxf4v0",
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
					"id": "xz4ptp7f",
					"name": "description",
					"type": "text",
					"required": false,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": 300,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "fnezc49h",
					"name": "code",
					"type": "text",
					"required": true,
					"presentable": false,
					"unique": false,
					"options": {
						"min": null,
						"max": 5,
						"pattern": ""
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

		collection, err := dao.FindCollectionByNameOrId("hpcu9it5k4fm36i")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
