/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvytl7xx7qkchm6")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_YH3EMCS` ON `categories` (`name`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvytl7xx7qkchm6")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_YH3EMCS` ON `categories` (`title`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fqbbieie",
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
  }))

  return dao.saveCollection(collection)
})
