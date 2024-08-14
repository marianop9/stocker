/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "a2eff3zi6zec7z7",
    "created": "2024-08-13 13:44:39.868Z",
    "updated": "2024-08-13 13:44:39.868Z",
    "name": "size",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8qy3lmfv",
        "name": "alias",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 5,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_size_alias` ON `size` (`alias`)"
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
  const collection = dao.findCollectionByNameOrId("a2eff3zi6zec7z7");

  return dao.deleteCollection(collection);
})
