/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "e00rttxufuj5soz",
    "created": "2024-08-10 20:05:07.701Z",
    "updated": "2024-08-10 20:05:07.701Z",
    "name": "products",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "k3nnsj7w",
        "name": "title",
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
        "id": "vbwxwfsl",
        "name": "description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 150,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "zoadr24m",
        "name": "provider",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "vwduhhm3gfb57aw",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "b3xdtb3v",
        "name": "brand",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "5rvhoric4wbb4au",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("e00rttxufuj5soz");

  return dao.deleteCollection(collection);
})
