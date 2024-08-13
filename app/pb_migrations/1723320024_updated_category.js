/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvytl7xx7qkchm6")

  collection.name = "categories"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_YH3EMCS` ON `categories` (`title`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvytl7xx7qkchm6")

  collection.name = "category"
  collection.indexes = []

  return dao.saveCollection(collection)
})
