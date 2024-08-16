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
			"id": "3tjqwrls9ffdork",
			"created": "2024-08-16 15:16:44.123Z",
			"updated": "2024-08-16 15:16:44.123Z",
			"name": "sizes",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "kaauzzyv",
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
				},
				{
					"system": false,
					"id": "l3hrchso",
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

		collection, err := dao.FindCollectionByNameOrId("3tjqwrls9ffdork")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
