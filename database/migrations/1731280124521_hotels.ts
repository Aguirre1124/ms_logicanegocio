import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Hotels extends BaseSchema {
  protected tableName = 'hotels' // Nombre de la tabla

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Clave primaria
      table.string('name').notNullable() // Columna para el nombre del hotel
      table.integer('servicio_id').unsigned().references('id').inTable('servicios').onDelete('CASCADE') // Clave foránea a `servicio`
      table.timestamps(true, true) // Timestamps de creación y actualización
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName) // Eliminar la tabla si la migración se revierte
  }
}
