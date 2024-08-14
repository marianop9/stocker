/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bajzlel2rpsk4ir")

  collection.name = "products_view"

  // remove
  collection.schema.removeField("q6km1tdp")

  // remove
  collection.schema.removeField("vefvolwv")

  // remove
  collection.schema.removeField("blzjdf0i")

  // remove
  collection.schema.removeField("djrl0is0")

  // remove
  collection.schema.removeField("ehbv4eqo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8drsbivt",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "si6wobkb",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "azbtsd8b",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e6xri6vs",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "huunxbkh",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bajzlel2rpsk4ir")

  collection.name = "product_view"

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("8drsbivt")

  // remove
  collection.schema.removeField("si6wobkb")

  // remove
  collection.schema.removeField("azbtsd8b")

  // remove
  collection.schema.removeField("e6xri6vs")

  // remove
  collection.schema.removeField("huunxbkh")

  return dao.saveCollection(collection)
})
