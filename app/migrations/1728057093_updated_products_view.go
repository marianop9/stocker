package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("4pukxudbnjn3juo")
		if err != nil {
			return err
		}

		options := map[string]any{}
		if err := json.Unmarshal([]byte(`{
			"query": "SELECT p.id,\n  p.name,\n  p.description,\n  p.` + "`" + `categoryId` + "`" + `,\n  c.name 'categoryName',\n  p.` + "`" + `providerId` + "`" + `,\n  pr.name 'providerName',\n  p.cost,\n  p.price\nFROM products p\n  JOIN categories c ON c.id = p.categoryId\n  JOIN providers pr ON pr.id = p.` + "`" + `providerId` + "`" + `"
		}`), &options); err != nil {
			return err
		}
		collection.SetOptions(options)

		// remove
		collection.Schema.RemoveField("grezbfon")

		// remove
		collection.Schema.RemoveField("alcu3q0l")

		// remove
		collection.Schema.RemoveField("tdtzwkfo")

		// remove
		collection.Schema.RemoveField("8r9lyj3j")

		// remove
		collection.Schema.RemoveField("ac1yanm0")

		// remove
		collection.Schema.RemoveField("98tvkjnq")

		// add
		new_name := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "xa2yapz0",
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
		}`), new_name); err != nil {
			return err
		}
		collection.Schema.AddField(new_name)

		// add
		new_description := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "d4c0babt",
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
		}`), new_description); err != nil {
			return err
		}
		collection.Schema.AddField(new_description)

		// add
		new_categoryId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "14kdi8rt",
			"name": "categoryId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "hpcu9it5k4fm36i",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), new_categoryId); err != nil {
			return err
		}
		collection.Schema.AddField(new_categoryId)

		// add
		new_categoryName := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "za1gg0p6",
			"name": "categoryName",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 3,
				"max": 50,
				"pattern": ""
			}
		}`), new_categoryName); err != nil {
			return err
		}
		collection.Schema.AddField(new_categoryName)

		// add
		new_providerId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "wueuzshs",
			"name": "providerId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "rzh5xyss27t3a7p",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), new_providerId); err != nil {
			return err
		}
		collection.Schema.AddField(new_providerId)

		// add
		new_providerName := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "3bfjapmx",
			"name": "providerName",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 3,
				"max": 50,
				"pattern": ""
			}
		}`), new_providerName); err != nil {
			return err
		}
		collection.Schema.AddField(new_providerName)

		// add
		new_cost := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "nnfa7gar",
			"name": "cost",
			"type": "number",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 0,
				"max": 999999,
				"noDecimal": false
			}
		}`), new_cost); err != nil {
			return err
		}
		collection.Schema.AddField(new_cost)

		// add
		new_price := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ra16avay",
			"name": "price",
			"type": "number",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 0,
				"max": 999999,
				"noDecimal": false
			}
		}`), new_price); err != nil {
			return err
		}
		collection.Schema.AddField(new_price)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("4pukxudbnjn3juo")
		if err != nil {
			return err
		}

		options := map[string]any{}
		if err := json.Unmarshal([]byte(`{
			"query": "SELECT p.id,\n  p.name,\n  p.description,\n  p.` + "`" + `categoryId` + "`" + `,\n  c.name 'categoryName',\n  p.` + "`" + `providerId` + "`" + `,\n  pr.name 'providerName'\nFROM products p\n  JOIN categories c ON c.id = p.categoryId\n  JOIN providers pr ON pr.id = p.` + "`" + `providerId` + "`" + `"
		}`), &options); err != nil {
			return err
		}
		collection.SetOptions(options)

		// add
		del_name := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "grezbfon",
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
		}`), del_name); err != nil {
			return err
		}
		collection.Schema.AddField(del_name)

		// add
		del_description := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "alcu3q0l",
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
		}`), del_description); err != nil {
			return err
		}
		collection.Schema.AddField(del_description)

		// add
		del_categoryId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "tdtzwkfo",
			"name": "categoryId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "hpcu9it5k4fm36i",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), del_categoryId); err != nil {
			return err
		}
		collection.Schema.AddField(del_categoryId)

		// add
		del_categoryName := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "8r9lyj3j",
			"name": "categoryName",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 3,
				"max": 50,
				"pattern": ""
			}
		}`), del_categoryName); err != nil {
			return err
		}
		collection.Schema.AddField(del_categoryName)

		// add
		del_providerId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ac1yanm0",
			"name": "providerId",
			"type": "relation",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "rzh5xyss27t3a7p",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), del_providerId); err != nil {
			return err
		}
		collection.Schema.AddField(del_providerId)

		// add
		del_providerName := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "98tvkjnq",
			"name": "providerName",
			"type": "text",
			"required": true,
			"presentable": false,
			"unique": false,
			"options": {
				"min": 3,
				"max": 50,
				"pattern": ""
			}
		}`), del_providerName); err != nil {
			return err
		}
		collection.Schema.AddField(del_providerName)

		// remove
		collection.Schema.RemoveField("xa2yapz0")

		// remove
		collection.Schema.RemoveField("d4c0babt")

		// remove
		collection.Schema.RemoveField("14kdi8rt")

		// remove
		collection.Schema.RemoveField("za1gg0p6")

		// remove
		collection.Schema.RemoveField("wueuzshs")

		// remove
		collection.Schema.RemoveField("3bfjapmx")

		// remove
		collection.Schema.RemoveField("nnfa7gar")

		// remove
		collection.Schema.RemoveField("ra16avay")

		return dao.SaveCollection(collection)
	})
}
