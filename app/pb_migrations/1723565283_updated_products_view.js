/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bajzlel2rpsk4ir")

  // remove
  collection.schema.removeField("9clfemlp")

  // remove
  collection.schema.removeField("rrt3qi4w")

  // remove
  collection.schema.removeField("ftu0bhoz")

  // remove
  collection.schema.removeField("fnpfvic2")

  // remove
  collection.schema.removeField("bnb4cb6x")

  // remove
  collection.schema.removeField("teigdmsy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8ln8bsdc",
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
    "id": "45mf6zz0",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ebnnerpq",
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
    "id": "ocpl79qa",
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
    "id": "yo17jgit",
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
    "id": "k9m12ymm",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9clfemlp",
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
    "id": "rrt3qi4w",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ftu0bhoz",
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
    "id": "fnpfvic2",
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
    "id": "bnb4cb6x",
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
    "id": "teigdmsy",
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
  collection.schema.removeField("8ln8bsdc")

  // remove
  collection.schema.removeField("45mf6zz0")

  // remove
  collection.schema.removeField("ebnnerpq")

  // remove
  collection.schema.removeField("ocpl79qa")

  // remove
  collection.schema.removeField("yo17jgit")

  // remove
  collection.schema.removeField("k9m12ymm")

  return dao.saveCollection(collection)
})
