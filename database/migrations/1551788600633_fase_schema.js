'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FaseSchema extends Schema {
  up() {
    this.create('fases', (table) => {
      table.increments()
      table.string('descricao', 100).notNullable().unique()
      table.string('createdBy', 20).notNullable()
      table.string('updatedBy', 20).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('fases')
  }
}

module.exports = FaseSchema
