/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vwduhhm3gfb57aw",
    "created": "2024-08-10 20:02:06.622Z",
    "updated": "2024-08-10 20:02:06.622Z",
    "name": "providers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jyzodobz",
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
        "id": "fucvyeuw",
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
      "CREATE UNIQUE INDEX `idx_gk2eAJo` ON `providers` (`title`)"
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
  const collection = dao.findCollectionByNameOrId("vwduhhm3gfb57aw");

  return dao.deleteCollection(collection);
})
