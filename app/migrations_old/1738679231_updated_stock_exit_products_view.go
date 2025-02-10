package migrations

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4143600848")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT\n  (ROW_NUMBER() OVER()) 'id',\n  sout.id 'stockExitId',\n  sout.` + "`" + `movementId` + "`" + `,\n  sout.` + "`" + `productUnitId` + "`" + `,\n  sout.quantity,\n  p.id 'productId',\n  p.name,\n  p.` + "`" + `unitCost` + "`" + `,\n  p.` + "`" + `totalCost` + "`" + `,\n  p.` + "`" + `cashPrice` + "`" + `,\n  p.` + "`" + `retailPrice` + "`" + `,\n  pu.` + "`" + `colorName` + "`" + `,\n  pu.` + "`" + `colorHexcode` + "`" + `,\n  pu.` + "`" + `sizeName` + "`" + `\nFROM stock_exits sout\n  JOIN product_units_view pu ON pu.id = sout.` + "`" + `productUnitId` + "`" + `\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n"
		}`), &collection); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_j0f6")

		// remove field
		collection.Fields.RemoveById("_clone_5aQ1")

		// remove field
		collection.Fields.RemoveById("_clone_2iKF")

		// remove field
		collection.Fields.RemoveById("_clone_0iUP")

		// remove field
		collection.Fields.RemoveById("_clone_eEGs")

		// remove field
		collection.Fields.RemoveById("_clone_Mist")

		// remove field
		collection.Fields.RemoveById("_clone_DGFy")

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"cascadeDelete": true,
			"collectionId": "obfw28bknu15htt",
			"hidden": false,
			"id": "_clone_eQx6",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "movementId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"cascadeDelete": false,
			"collectionId": "1o8eb05ndq83rht",
			"hidden": false,
			"id": "_clone_btvU",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "productUnitId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "_clone_1Pue",
			"max": 999,
			"min": 1,
			"name": "quantity",
			"onlyInt": true,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_D64o",
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
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"hidden": false,
			"id": "_clone_ioCA",
			"max": 999999,
			"min": 0,
			"name": "unitCost",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"hidden": false,
			"id": "_clone_oZe6",
			"max": 999999,
			"min": 0,
			"name": "totalCost",
			"onlyInt": false,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"hidden": false,
			"id": "_clone_dwdY",
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
			"id": "_clone_ldc7",
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
			"id": "_clone_8tIi",
			"max": 50,
			"min": 3,
			"name": "colorName",
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
		if err := collection.Fields.AddMarshaledJSONAt(12, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_Xop6",
			"max": 0,
			"min": 0,
			"name": "colorHexcode",
			"pattern": "^#(?:[0-9a-fA-F]{3}){1,2}$",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(13, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_OOV2",
			"max": 5,
			"min": 1,
			"name": "sizeName",
			"pattern": "",
			"presentable": true,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		return app.Save(collection)
	}, func(app core.App) error {
		collection, err := app.FindCollectionByNameOrId("pbc_4143600848")
		if err != nil {
			return err
		}

		// update collection data
		if err := json.Unmarshal([]byte(`{
			"viewQuery": "SELECT\n  (ROW_NUMBER() OVER()) 'id',\n  sout.id 'stockExitId',\n  sout.` + "`" + `movementId` + "`" + `,\n  sout.` + "`" + `productUnitId` + "`" + `,\n  sout.quantity,\n  p.id 'productId',\n  p.name,\n  -- p.` + "`" + `cost` + "`" + `,\n  -- p.` + "`" + `price` + "`" + `,\n  pu.` + "`" + `colorName` + "`" + `,\n  pu.` + "`" + `colorHexcode` + "`" + `,\n  pu.` + "`" + `sizeName` + "`" + `\nFROM stock_exits sout\n  JOIN product_units_view pu ON pu.id = sout.` + "`" + `productUnitId` + "`" + `\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n"
		}`), &collection); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(2, []byte(`{
			"cascadeDelete": true,
			"collectionId": "obfw28bknu15htt",
			"hidden": false,
			"id": "_clone_j0f6",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "movementId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(3, []byte(`{
			"cascadeDelete": false,
			"collectionId": "1o8eb05ndq83rht",
			"hidden": false,
			"id": "_clone_5aQ1",
			"maxSelect": 1,
			"minSelect": 0,
			"name": "productUnitId",
			"presentable": false,
			"required": true,
			"system": false,
			"type": "relation"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(4, []byte(`{
			"hidden": false,
			"id": "_clone_2iKF",
			"max": 999,
			"min": 1,
			"name": "quantity",
			"onlyInt": true,
			"presentable": false,
			"required": true,
			"system": false,
			"type": "number"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(6, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_0iUP",
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
		if err := collection.Fields.AddMarshaledJSONAt(7, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_eEGs",
			"max": 50,
			"min": 3,
			"name": "colorName",
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
		if err := collection.Fields.AddMarshaledJSONAt(8, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_Mist",
			"max": 0,
			"min": 0,
			"name": "colorHexcode",
			"pattern": "^#(?:[0-9a-fA-F]{3}){1,2}$",
			"presentable": false,
			"primaryKey": false,
			"required": false,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// add field
		if err := collection.Fields.AddMarshaledJSONAt(9, []byte(`{
			"autogeneratePattern": "",
			"hidden": false,
			"id": "_clone_DGFy",
			"max": 5,
			"min": 1,
			"name": "sizeName",
			"pattern": "",
			"presentable": true,
			"primaryKey": false,
			"required": true,
			"system": false,
			"type": "text"
		}`)); err != nil {
			return err
		}

		// remove field
		collection.Fields.RemoveById("_clone_eQx6")

		// remove field
		collection.Fields.RemoveById("_clone_btvU")

		// remove field
		collection.Fields.RemoveById("_clone_1Pue")

		// remove field
		collection.Fields.RemoveById("_clone_D64o")

		// remove field
		collection.Fields.RemoveById("_clone_ioCA")

		// remove field
		collection.Fields.RemoveById("_clone_oZe6")

		// remove field
		collection.Fields.RemoveById("_clone_dwdY")

		// remove field
		collection.Fields.RemoveById("_clone_ldc7")

		// remove field
		collection.Fields.RemoveById("_clone_8tIi")

		// remove field
		collection.Fields.RemoveById("_clone_Xop6")

		// remove field
		collection.Fields.RemoveById("_clone_OOV2")

		return app.Save(collection)
	})
}
