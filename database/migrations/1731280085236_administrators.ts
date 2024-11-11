import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Administrators extends BaseSchema {
  protected tableName = 'administrators' // Nombre de la tabla

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Clave primaria
      table.string('name').notNullable() // Columna para el nombre del administrador
      table.string('email').notNullable().unique() // Columna para el email (único)
      table.string('phone_number').notNullable() // Columna para el número de teléfono
      table.integer('administrator_id').unsigned().references('id').inTable('servicios').onDelete('CASCADE') // Clave foránea que referencia a `servicios`
      table.timestamps(true, true) // Timestamps de creación y actualización
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName) // Eliminar la tabla si la migración se revierte
  }
}
