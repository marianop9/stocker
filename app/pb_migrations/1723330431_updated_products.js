/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e00rttxufuj5soz")

  // remove
  collection.schema.removeField("b3xdtb3v")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e00rttxufuj5soz")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("kmtnxh9l")

  return dao.saveCollection(collection)
})
