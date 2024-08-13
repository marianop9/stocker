/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "bajzlel2rpsk4ir",
    "created": "2024-08-11 14:40:30.658Z",
    "updated": "2024-08-11 14:40:30.658Z",
    "name": "product_view",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "q6km1tdp",
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
        "id": "vefvolwv",
        "name": "providerId",
        "type": "relation",
        "required": false,
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
        "id": "blzjdf0i",
        "name": "providerName",
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
        "id": "djrl0is0",
        "name": "categoryId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "jvytl7xx7qkchm6",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "ehbv4eqo",
        "name": "categoryName",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 3,
          "max": 50,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT p.id,\n  p.name,\n  pr.id as providerId,\n  pr.name as providerName,\n  c.id as categoryId,\n  c.name as categoryName\nFROM products p\n  JOIN providers pr ON pr.id = p.provider\n  JOIN categories c ON c.id = p.category\n  \n\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("bajzlel2rpsk4ir");

  return dao.deleteCollection(collection);
})
