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
			"id": "qtguurakaklrhpq",
			"created": "2024-08-16 15:09:15.699Z",
			"updated": "2024-08-16 15:09:15.699Z",
			"name": "colors",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "hl97b4hb",
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
					"id": "uaranc6q",
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
					"id": "60v6edki",
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
			"indexes": [
				"CREATE INDEX ` + "`" + `idx_colors_hexcode` + "`" + ` ON ` + "`" + `colors` + "`" + ` (` + "`" + `hexcode` + "`" + `)"
			],
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

		collection, err := dao.FindCollectionByNameOrId("qtguurakaklrhpq")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
