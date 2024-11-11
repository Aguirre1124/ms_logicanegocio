import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products' // Nombre de la tabla

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Clave primaria
      table.string('name').notNullable() // Nombre del producto
      table.text('description').notNullable() // Descripción del producto
      table.decimal('price', 10, 2).notNullable() // Precio del producto, con dos decimales
      table.integer('stock').notNullable() // Cantidad en stock del producto
      table.timestamps(true, true) // Timestamps de creación y actualización
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName) // Eliminar la tabla si la migración se revierte
  }
}
