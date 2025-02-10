package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("4pukxudbnjn3juo")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT p.id,\n  p.name,\n  p.description,\n  p.` + "`" + `categoryId` + "`" + `,\n  c.name 'categoryName',\n  p.` + "`" + `providerId` + "`" + `,\n  pr.name 'providerName',\n  m.name 'materialName',\n  ct.name 'clothingTypeName',\n  p.` + "`" + `unitCost` + "`" + `,\n  p.` + "`" + `totalCost` + "`" + `,\n  p.` + "`" + `cashPrice` + "`" + `,\n  p.` + "`" + `retailPrice` + "`" + `,\n  p.sku\nFROM products p\n  JOIN categories c ON c.id = p.categoryId\n  JOIN providers pr ON pr.id = p.` + "`" + `providerId` + "`" + `\n  JOIN materials m ON m.id = p.` + "`" + `materialId` + "`" + `\n  JOIN clothing_types ct ON ct.id = p.` + "`" + `clothingTypeId` + "`" + `"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_Hm41")

		// remove field
		collection.Fields.RemoveById("_clone_t6OZ")

		// remove field
		collection.Fields.RemoveById("_clone_vAaR")

		// remove field
		collection.Fields.RemoveById("_clone_TrRu")

		// remove field
		collection.Fields.RemoveById("_clone_A8uv")

		// remove field
		collection.Fields.RemoveById("_clone_HYMr")

		// remove field
		collection.Fields.RemoveById("_clone_xQqQ")

		// remove field
		collection.Fields.RemoveById("_clone_dv6J")

		// remove field
		collection.Fields.RemoveById("_clone_6ZwA")

		// remove field
		collection.Fields.RemoveById("_clone_MAha")

		// remove field
		collection.Fields.RemoveById("_clone_Sl06")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_GLHA",
			"max": 50,
			"min": 3,
			"name": "name",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_HTU5",
			"max": 300,
			"min": 0,
			"name": "description",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"cascadeDelete": false,
			"collectionId": "hpcu9it5k4fm36i",
			"hidden": false,
			"id": "_clone_lFmI",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "categoryId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_U3US",
			"max": 50,
			"min": 3,
			"name": "categoryName",
			"pattern": "",
			"presentable": true,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"cascadeDelete": false,
			"collectionId": "rzh5xyss27t3a7p",
			"hidden": false,
			"id": "_clone_6s8n",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "providerId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_CSn0",
			"max": 50,
			"min": 3,
			"name": "providerName",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_qnny",
			"max": 100,
			"min": 0,
			"name": "materialName",
			"pattern": "",
			"presentable": true,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_GcDl",
			"max": 100,
			"min": 0,
			"name": "clothingTypeName",
			"pattern": "",
			"presentable": true,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"hidden": false,
			"id": "_clone_Sesc",
			"max": 999999,
			"min": 0,
			"name": "unitCost",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"hidden": false,
			"id": "_clone_b8BI",
			"max": 999999,
			"min": 0,
			"name": "totalCost",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "_clone_3NGV",
			"max": 999999,
			"min": 0,
			"name": "cashPrice",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"hidden": false,
			"id": "_clone_kcBt",
			"max": 999999,
			"min": 0,
			"name": "retailPrice",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(13, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_mfDe",
			"max": 10,
			"min": 0,
			"name": "sku",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("4pukxudbnjn3juo")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT p.id,\n  p.name,\n  p.description,\n  p.` + "`" + `categoryId` + "`" + `,\n  c.name 'categoryName',\n  p.` + "`" + `providerId` + "`" + `,\n  pr.name 'providerName',\n  p.` + "`" + `unitCost` + "`" + `,\n  p.` + "`" + `totalCost` + "`" + `,\n  p.` + "`" + `cashPrice` + "`" + `,\n  p.` + "`" + `retailPrice` + "`" + `,\n  p.sku\nFROM products p\n  JOIN categories c ON c.id = p.categoryId\n  JOIN providers pr ON pr.id = p.` + "`" + `providerId` + "`" + `"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_Hm41",
			"max": 50,
			"min": 3,
			"name": "name",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_t6OZ",
			"max": 300,
			"min": 0,
			"name": "description",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"cascadeDelete": false,
			"collectionId": "hpcu9it5k4fm36i",
			"hidden": false,
			"id": "_clone_vAaR",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "categoryId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_TrRu",
			"max": 50,
			"min": 3,
			"name": "categoryName",
			"pattern": "",
			"presentable": true,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(5, []byte(`{
			"cascadeDelete": false,
			"collectionId": "rzh5xyss27t3a7p",
			"hidden": false,
			"id": "_clone_A8uv",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "providerId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_HYMr",
			"max": 50,
			"min": 3,
			"name": "providerName",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "_clone_xQqQ",
			"max": 999999,
			"min": 0,
			"name": "unitCost",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "_clone_dv6J",
			"max": 999999,
			"min": 0,
			"name": "totalCost",
			"onlyInt": false,
			"presentable": false,
			"required": false,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"hidden": false,
			"id": "_clone_6ZwA",
			"max": 999999,
			"min": 0,
			"name": "cashPrice",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"hidden": false,
			"id": "_clone_MAha",
			"max": 999999,
			"min": 0,
			"name": "retailPrice",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_Sl06",
			"max": 10,
			"min": 0,
			"name": "sku",
			"pattern": "",
			"presentable": false,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_GLHA")

		// remove field
		collection.Fields.RemoveById("_clone_HTU5")

		// remove field
		collection.Fields.RemoveById("_clone_lFmI")

		// remove field
		collection.Fields.RemoveById("_clone_U3US")

		// remove field
		collection.Fields.RemoveById("_clone_6s8n")

		// remove field
		collection.Fields.RemoveById("_clone_CSn0")

		// remove field
		collection.Fields.RemoveById("_clone_qnny")

		// remove field
		collection.Fields.RemoveById("_clone_GcDl")

		// remove field
		collection.Fields.RemoveById("_clone_Sesc")

		// remove field
		collection.Fields.RemoveById("_clone_b8BI")

		// remove field
		collection.Fields.RemoveById("_clone_3NGV")

		// remove field
		collection.Fields.RemoveById("_clone_kcBt")

		// remove field
		collection.Fields.RemoveById("_clone_mfDe")

		return app.Save(collection)
	})
}
