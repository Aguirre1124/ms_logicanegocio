import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WorkShifts extends BaseSchema {
  protected tableName = 'work_shifts' // Nombre de la tabla

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Clave primaria
      table.timestamp('start_time', { useTz: true }).notNullable() // Columna para el inicio del turno
      table.timestamp('end_time', { useTz: true }).notNullable() // Columna para el fin del turno
      table.integer('conductor_id').unsigned().references('id').inTable('conductors').onDelete('CASCADE') // Clave foránea para `conductor`
      table.timestamps(true, true) // Timestamps de creación y actualización
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName) // Eliminar la tabla si la migración se revierte
  }
}
