/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "5rvhoric4wbb4au",
    "created": "2024-08-10 20:01:08.506Z",
    "updated": "2024-08-10 20:01:08.506Z",
    "name": "brands",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kjnrnvuc",
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
        "id": "mjvv1yiz",
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
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_BxmOWP3` ON `brands` (`title`)"
    ],
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
  const collection = dao.findCollectionByNameOrId("5rvhoric4wbb4au");

  return dao.deleteCollection(collection);
})
