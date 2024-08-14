/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2024-08-10 19:05:00.365Z",
      "updated": "2024-08-10 19:05:00.366Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null,
            "maxSelect": 1,
            "maxSize": 5242880,
            "protected": false
          }
        }
      ],
      "indexes": [],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "onlyVerified": false,
        "requireEmail": false
      }
    },
    {
      "id": "jvytl7xx7qkchm6",
      "created": "2024-08-10 19:54:45.624Z",
      "updated": "2024-08-11 14:39:11.766Z",
      "name": "categories",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "fqbbieie",
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
          "id": "pp1hxifb",
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
        "CREATE UNIQUE INDEX `idx_YH3EMCS` ON `categories` (`name`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
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
    },
    {
      "id": "vwduhhm3gfb57aw",
      "created": "2024-08-10 20:02:06.622Z",
      "updated": "2024-08-11 14:39:28.938Z",
      "name": "providers",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "jyzodobz",
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
        "CREATE UNIQUE INDEX `idx_gk2eAJo` ON `providers` (`name`)"
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "e00rttxufuj5soz",
      "created": "2024-08-10 20:05:07.701Z",
      "updated": "2024-08-11 14:39:03.204Z",
      "name": "products",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "k3nnsj7w",
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
          "id": "kmtnxh9l",
          "name": "category",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "jvytl7xx7qkchm6",
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
    },
    {
      "id": "bajzlel2rpsk4ir",
      "created": "2024-08-11 14:40:30.658Z",
      "updated": "2024-08-14 00:00:58.515Z",
      "name": "products_view",
      "type": "view",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "dso7jkfs",
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
          "id": "d2tsppwi",
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
          "id": "xbqumwuk",
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
          "id": "okn8seae",
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
          "id": "lvpiiula",
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
          "id": "1kka9nq2",
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
        "query": "SELECT p.id,\n  p.name,\n  p.description,\n  pr.id as providerId,\n  pr.name as providerName,\n  c.id as categoryId,\n  c.name as categoryName\nFROM products p\n  JOIN providers pr ON pr.id = p.provider\n  JOIN categories c ON c.id = p.category\n  \n\n"
      }
    },
    {
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
    },
    {
      "id": "rg6ej83jes636u3",
      "created": "2024-08-13 15:09:11.754Z",
      "updated": "2024-08-13 15:10:26.465Z",
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
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "w0u98atiyrfa459",
      "created": "2024-08-13 15:10:06.062Z",
      "updated": "2024-08-13 15:10:18.715Z",
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
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    },
    {
      "id": "z7n48s67vufpfh7",
      "created": "2024-08-13 17:19:29.175Z",
      "updated": "2024-08-13 17:19:29.175Z",
      "name": "product_details",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "n2wnvcwy",
          "name": "product",
          "type": "relation",
          "required": true,
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
          "id": "djwcrpsg",
          "name": "color",
          "type": "relation",
          "required": true,
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
          "id": "tjdv061z",
          "name": "size",
          "type": "relation",
          "required": true,
          "presentable": false,
          "unique": false,
          "options": {
            "collectionId": "w0u98atiyrfa459",
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
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
