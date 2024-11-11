import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users' // Nombre de la tabla

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Clave primaria
      table.string('name').notNullable() // Columna para el nombre del usuario
      table.integer('servicio_id').unsigned().references('id').inTable('servicios').onDelete('CASCADE') // Clave foránea a `servicio`
      table.timestamps(true, true) // Timestamps de creación y actualización
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName) // Eliminar la tabla si la migración se revierte
  }
}
