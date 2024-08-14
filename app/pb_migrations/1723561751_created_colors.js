/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "rg6ej83jes636u3",
    "created": "2024-08-13 15:09:11.754Z",
    "updated": "2024-08-13 15:09:11.754Z",
    "name": "colors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qtvb2qgp",
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
        "id": "6fbijmvt",
        "name": "hexcode",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 4,
          "max": 7,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rg6ej83jes636u3");

  return dao.deleteCollection(collection);
})
