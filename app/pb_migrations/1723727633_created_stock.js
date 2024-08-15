/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dtsfrvntw5n3m6z",
    "created": "2024-08-15 13:13:53.403Z",
    "updated": "2024-08-15 13:13:53.403Z",
    "name": "stock",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "njb52uwa",
        "name": "product_detail",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "z7n48s67vufpfh7",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "rfhmapli",
        "name": "quantity",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 999999,
          "noDecimal": true
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dtsfrvntw5n3m6z");

  return dao.deleteCollection(collection);
})
