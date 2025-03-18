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
			"viewQuery": "SELECT p.id,\n  p.name,\n  p.description,\n  p.` + "`" + `categoryId` + "`" + `,\n  c.name 'categoryName',\n  p.` + "`" + `providerId` + "`" + `,\n  pr.name 'providerName',\n  p.` + "`" + `materialId` + "`" + `,\n  m.name 'materialName',\n  p.` + "`" + `clothingTypeId` + "`" + `,\n  ct.name 'clothingTypeName',\n  p.` + "`" + `unitCost` + "`" + `,\n  p.` + "`" + `totalCost` + "`" + `,\n  p.` + "`" + `cashPrice` + "`" + `,\n  p.` + "`" + `retailPrice` + "`" + `,\n  p.sku\nFROM products p\n  JOIN categories c ON c.id = p.categoryId\n  JOIN providers pr ON pr.id = p.` + "`" + `providerId` + "`" + `\n  JOIN materials m ON m.id = p.` + "`" + `materialId` + "`" + `\n  JOIN clothing_types ct ON ct.id = p.` + "`" + `clothingTypeId` + "`" + `\nORDER BY p.created DESC"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_wCuJ")

		// remove field
		collection.Fields.RemoveById("_clone_ZzdW")

		// remove field
		collection.Fields.RemoveById("_clone_O0ks")

		// remove field
		collection.Fields.RemoveById("_clone_8Ju0")

		// remove field
		collection.Fields.RemoveById("_clone_cljl")

		// remove field
		collection.Fields.RemoveById("_clone_sUJg")

		// remove field
		collection.Fields.RemoveById("_clone_9IvS")

		// remove field
		collection.Fields.RemoveById("_clone_3ILJ")

		// remove field
		collection.Fields.RemoveById("_clone_mlHj")

		// remove field
		collection.Fields.RemoveById("_clone_hNJG")

		// remove field
		collection.Fields.RemoveById("_clone_D8xZ")

		// remove field
		collection.Fields.RemoveById("_clone_h8zR")

		// remove field
		collection.Fields.RemoveById("_clone_72PJ")

		// remove field
		collection.Fields.RemoveById("_clone_sDTF")

		// remove field
		collection.Fields.RemoveById("_clone_cYua")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_IXlU",
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
			"id": "_clone_PqFC",
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
			"id": "_clone_0kaz",
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
			"id": "_clone_E6O2",
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
			"id": "_clone_4w1S",
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
			"id": "_clone_Rz4M",
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
			"cascadeDelete": false,
			"collectionId": "pbc_1022373260",
			"hidden": false,
			"id": "_clone_XcN0",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "materialId",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_3Egl",
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
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1574068377",
			"hidden": false,
			"id": "_clone_toOQ",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "clothingTypeId",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_Kna8",
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
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "_clone_5TeH",
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
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"hidden": false,
			"id": "_clone_6H18",
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
		if err := collection.Fields.AddMarshaledJSONAt(13, []byte(`{
			"hidden": false,
			"id": "_clone_GoZa",
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
		if err := collection.Fields.AddMarshaledJSONAt(14, []byte(`{
			"hidden": false,
			"id": "_clone_LzOi",
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
		if err := collection.Fields.AddMarshaledJSONAt(15, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_56wv",
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
			"viewQuery": "SELECT p.id,\n  p.name,\n  p.description,\n  p.` + "`" + `categoryId` + "`" + `,\n  c.name 'categoryName',\n  p.` + "`" + `providerId` + "`" + `,\n  pr.name 'providerName',\n  p.` + "`" + `materialId` + "`" + `,\n  m.name 'materialName',\n  p.` + "`" + `clothingTypeId` + "`" + `,\n  ct.name 'clothingTypeName',\n  p.` + "`" + `unitCost` + "`" + `,\n  p.` + "`" + `totalCost` + "`" + `,\n  p.` + "`" + `cashPrice` + "`" + `,\n  p.` + "`" + `retailPrice` + "`" + `,\n  p.sku\nFROM products p\n  JOIN categories c ON c.id = p.categoryId\n  JOIN providers pr ON pr.id = p.` + "`" + `providerId` + "`" + `\n  JOIN materials m ON m.id = p.` + "`" + `materialId` + "`" + `\n  JOIN clothing_types ct ON ct.id = p.` + "`" + `clothingTypeId` + "`" + `"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(1, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_wCuJ",
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
			"id": "_clone_ZzdW",
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
			"id": "_clone_O0ks",
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
			"id": "_clone_8Ju0",
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
			"id": "_clone_cljl",
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
			"id": "_clone_sUJg",
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
			"cascadeDelete": false,
			"collectionId": "pbc_1022373260",
			"hidden": false,
			"id": "_clone_9IvS",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "materialId",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_3ILJ",
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
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"cascadeDelete": false,
			"collectionId": "pbc_1574068377",
			"hidden": false,
			"id": "_clone_mlHj",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "clothingTypeId",
			"presentable": false,
			"required": false,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(10, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_hNJG",
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
		if err := collection.Fields.AddMarshaledJSONAt(11, []byte(`{
			"hidden": false,
			"id": "_clone_D8xZ",
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
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"hidden": false,
			"id": "_clone_h8zR",
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
		if err := collection.Fields.AddMarshaledJSONAt(13, []byte(`{
			"hidden": false,
			"id": "_clone_72PJ",
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
		if err := collection.Fields.AddMarshaledJSONAt(14, []byte(`{
			"hidden": false,
			"id": "_clone_sDTF",
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
		if err := collection.Fields.AddMarshaledJSONAt(15, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_cYua",
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
		collection.Fields.RemoveById("_clone_IXlU")

		// remove field
		collection.Fields.RemoveById("_clone_PqFC")

		// remove field
		collection.Fields.RemoveById("_clone_0kaz")

		// remove field
		collection.Fields.RemoveById("_clone_E6O2")

		// remove field
		collection.Fields.RemoveById("_clone_4w1S")

		// remove field
		collection.Fields.RemoveById("_clone_Rz4M")

		// remove field
		collection.Fields.RemoveById("_clone_XcN0")

		// remove field
		collection.Fields.RemoveById("_clone_3Egl")

		// remove field
		collection.Fields.RemoveById("_clone_toOQ")

		// remove field
		collection.Fields.RemoveById("_clone_Kna8")

		// remove field
		collection.Fields.RemoveById("_clone_5TeH")

		// remove field
		collection.Fields.RemoveById("_clone_6H18")

		// remove field
		collection.Fields.RemoveById("_clone_GoZa")

		// remove field
		collection.Fields.RemoveById("_clone_LzOi")

		// remove field
		collection.Fields.RemoveById("_clone_56wv")

		return app.Save(collection)
	})
}
