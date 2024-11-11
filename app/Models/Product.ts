import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
// import Client from './Client'
import Category from './Category'

export default class Product extends BaseModel {

  @column({ isPrimary: true }) // Define 'id' como clave primaria.
  public id: number

  @column() // Define el nombre del producto.
  public name: string

  @column() // Define la descripcion del producto.
  public description: string

  @column() // Define el precio del producto.
  public price : number

  @column() // Define el stock del producto
  public stock : number

  @column.dateTime({ autoCreate: true }) // Fecha de creación automática.
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Fecha de actualización automática.
  public updatedAt: DateTime

  // Relación muchos a uno con Client.
  // @belongsTo(() => Client, {
  //   foreignKey: 'client_id' // Clave foránea en Product que apunta a Client.
  // })
  // public client: BelongsTo<typeof Client>

  // Relación muchos a muchos con Category.
  @manyToMany(() => Category, {
    pivotTable: 'category_products', // Nombre de la tabla intermedia.
    pivotForeignKey: 'product_id', // Clave en la tabla intermedia para Product.
    pivotRelatedForeignKey: 'category_id' // Clave en la tabla intermedia para Category.
  })
  public categories: ManyToMany<typeof Category>
}
