'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProcessoSchema extends Schema {
  up() {
    this.create('processos', (table) => {
      table.increments()
      table.integer('ano').unsigned()
      table.string('numero', 100)
      table.string('numero_ano', 100).unique()
      table.string('titular', 300).notNullable()
      table.integer('fase_id')
        .unsigned()
        .references('id')
        .inTable('fases')
      table.string('ultimo_evento', 3000)
      table.string('link', 150)
      table.string('uf', 2)
      table.string('tipo_inclusao', 2).notNullable()
      table.string('prioridade', 2).notNullable()
      table.string('createdBy', 20).notNullable()
      table.string('updatedBy', 20).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('processos')
  }
}

module.exports = ProcessoSchema
