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

		collection, err := dao.FindCollectionByNameOrId("54vt638696x6y3w")
		if err != nil {
			return err
		}

		options := map[string]any{}
		if err := json.Unmarshal([]byte(`{
			"query": "SELECT\n  (ROW_NUMBER() OVER()) 'id',\n  sin.id 'stockEntryId',\n  sin.` + "`" + `movementId` + "`" + `,\n  sin.` + "`" + `productUnitId` + "`" + `,\n  sin.quantity,\n  p.id 'productId',\n  p.name,\n  p.price,\n  pu.` + "`" + `colorName` + "`" + `,\n  pu.` + "`" + `sizeAlias` + "`" + `\nFROM stock_entries sin\n  JOIN product_units_view pu ON pu.id = sin.` + "`" + `productUnitId` + "`" + `\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n"
		}`), &options); err != nil {
			return err
		}
		collection.SetOptions(options)

		// remove
		collection.Schema.RemoveField("tshpdm7n")

		// remove
		collection.Schema.RemoveField("apus3oer")

		// remove
		collection.Schema.RemoveField("3g61yusz")

		// remove
		collection.Schema.RemoveField("niukbk4o")

		// remove
		collection.Schema.RemoveField("ven4alny")

		// remove
		collection.Schema.RemoveField("nbv5heli")

		// remove
		collection.Schema.RemoveField("btawlowb")

		// remove
		collection.Schema.RemoveField("uhg1wqwp")

		// add
		new_stockEntryId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "q6z43okc",
			"name": "stockEntryId",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "h0l22n1uyldvp3g",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), new_stockEntryId); err != nil {
			return err
		}
		collection.Schema.AddField(new_stockEntryId)

		// add
		new_movementId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "lojmfns4",
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
		}`), new_movementId); err != nil {
			return err
		}
		collection.Schema.AddField(new_movementId)

		// add
		new_productUnitId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "zl79bfeh",
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
		}`), new_productUnitId); err != nil {
			return err
		}
		collection.Schema.AddField(new_productUnitId)

		// add
		new_quantity := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "3mbmn111",
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
		}`), new_quantity); err != nil {
			return err
		}
		collection.Schema.AddField(new_quantity)

		// add
		new_productId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ei9topty",
			"name": "productId",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "imv01buv3cinry7",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), new_productId); err != nil {
			return err
		}
		collection.Schema.AddField(new_productId)

		// add
		new_name := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "pbr9jols",
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
		new_price := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "x7xiujit",
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

		// add
		new_colorName := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "kwm0qim4",
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
		}`), new_colorName); err != nil {
			return err
		}
		collection.Schema.AddField(new_colorName)

		// add
		new_sizeAlias := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "nevtctqt",
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
		}`), new_sizeAlias); err != nil {
			return err
		}
		collection.Schema.AddField(new_sizeAlias)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("54vt638696x6y3w")
		if err != nil {
			return err
		}

		options := map[string]any{}
		if err := json.Unmarshal([]byte(`{
			"query": "SELECT\n  (ROW_NUMBER() OVER()) 'id',\n  sin.id 'stockEntryId',\n  sin.` + "`" + `movementId` + "`" + `,\n  sin.` + "`" + `productUnitId` + "`" + `,\n  sin.quantity,\n  p.id 'productId',\n  p.name,\n  pu.` + "`" + `colorName` + "`" + `,\n  pu.` + "`" + `sizeAlias` + "`" + `\nFROM stock_entries sin\n  JOIN product_units_view pu ON pu.id = sin.` + "`" + `productUnitId` + "`" + `\n  JOIN products p ON p.id = pu.` + "`" + `productId` + "`" + `\n"
		}`), &options); err != nil {
			return err
		}
		collection.SetOptions(options)

		// add
		del_stockEntryId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "tshpdm7n",
			"name": "stockEntryId",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "h0l22n1uyldvp3g",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), del_stockEntryId); err != nil {
			return err
		}
		collection.Schema.AddField(del_stockEntryId)

		// add
		del_movementId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "apus3oer",
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
		}`), del_movementId); err != nil {
			return err
		}
		collection.Schema.AddField(del_movementId)

		// add
		del_productUnitId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "3g61yusz",
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
		}`), del_productUnitId); err != nil {
			return err
		}
		collection.Schema.AddField(del_productUnitId)

		// add
		del_quantity := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "niukbk4o",
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
		}`), del_quantity); err != nil {
			return err
		}
		collection.Schema.AddField(del_quantity)

		// add
		del_productId := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "ven4alny",
			"name": "productId",
			"type": "relation",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"collectionId": "imv01buv3cinry7",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": null
			}
		}`), del_productId); err != nil {
			return err
		}
		collection.Schema.AddField(del_productId)

		// add
		del_name := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "nbv5heli",
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
		del_colorName := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "btawlowb",
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
		}`), del_colorName); err != nil {
			return err
		}
		collection.Schema.AddField(del_colorName)

		// add
		del_sizeAlias := &schema.SchemaField{}
		if err := json.Unmarshal([]byte(`{
			"system": false,
			"id": "uhg1wqwp",
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
		}`), del_sizeAlias); err != nil {
			return err
		}
		collection.Schema.AddField(del_sizeAlias)

		// remove
		collection.Schema.RemoveField("q6z43okc")

		// remove
		collection.Schema.RemoveField("lojmfns4")

		// remove
		collection.Schema.RemoveField("zl79bfeh")

		// remove
		collection.Schema.RemoveField("3mbmn111")

		// remove
		collection.Schema.RemoveField("ei9topty")

		// remove
		collection.Schema.RemoveField("pbr9jols")

		// remove
		collection.Schema.RemoveField("x7xiujit")

		// remove
		collection.Schema.RemoveField("kwm0qim4")

		// remove
		collection.Schema.RemoveField("nevtctqt")

		return dao.SaveCollection(collection)
	})
}
