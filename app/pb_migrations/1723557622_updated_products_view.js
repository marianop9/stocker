/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bajzlel2rpsk4ir")

  collection.options = {
    "query": "SELECT p.id,\n  p.name,\n  p.description,\n  pr.id as providerId,\n  pr.name as providerName,\n  c.id as categoryId,\n  c.name as categoryName\nFROM products p\n  JOIN providers pr ON pr.id = p.provider\n  JOIN categories c ON c.id = p.category\n  \n\n"
  }

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bajzlel2rpsk4ir")

  collection.options = {
    "query": "SELECT p.id,\n  p.name,\n  pr.id as providerId,\n  pr.name as providerName,\n  c.id as categoryId,\n  c.name as categoryName\nFROM products p\n  JOIN providers pr ON pr.id = p.provider\n  JOIN categories c ON c.id = p.category\n  \n\n"
  }

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

  return dao.saveCollection(collection)
})
