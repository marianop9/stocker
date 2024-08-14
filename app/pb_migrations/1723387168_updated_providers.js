/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vwduhhm3gfb57aw")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_gk2eAJo` ON `providers` (`name`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vwduhhm3gfb57aw")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_gk2eAJo` ON `providers` (`title`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
