import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Batches extends BaseSchema {
  protected tableName = 'batches' // Nombre de la tabla

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Clave primaria
      table.integer('quantity').notNullable() // Columna para la cantidad de productos en el lote
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()) // Fecha de creación automática
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName) // Eliminar la tabla si la migración se revierte
  }
}
