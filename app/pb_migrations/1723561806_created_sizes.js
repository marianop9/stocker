/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "w0u98atiyrfa459",
    "created": "2024-08-13 15:10:06.062Z",
    "updated": "2024-08-13 15:10:06.062Z",
    "name": "sizes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hfxq522n",
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
      "CREATE UNIQUE INDEX `idx_size_alias` ON `sizes` (`alias`)"
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
  const collection = dao.findCollectionByNameOrId("w0u98atiyrfa459");

  return dao.deleteCollection(collection);
})
