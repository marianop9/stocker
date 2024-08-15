/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zh3abhzo1an426b",
    "created": "2024-08-14 22:45:46.825Z",
    "updated": "2024-08-14 22:45:46.825Z",
    "name": "product_details_view",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yvarisan",
        "name": "productId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "e00rttxufuj5soz",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "mnkwbf89",
        "name": "colorId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "rg6ej83jes636u3",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "wzt1zgav",
        "name": "colorHexcode",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 4,
          "max": 7,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "emuhmfax",
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
      },
      {
        "system": false,
        "id": "9opafppu",
        "name": "sizeId",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "w0u98atiyrfa459",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "swv7zee0",
        "name": "sizeAlias",
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
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT pd.id 'id',\n  p.id 'productId',\n  c.id 'colorId',\n  c.hexcode 'colorHexcode',\n  c.name 'colorName',\n  s.id 'sizeId',\n  s.alias 'sizeAlias'\nFROM product_details pd\n  JOIN products p ON p.id = pd.product\n  JOIN colors c ON c.id = pd.color\n  JOIN sizes s ON s.id = pd.size\n\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zh3abhzo1an426b");

  return dao.deleteCollection(collection);
})
