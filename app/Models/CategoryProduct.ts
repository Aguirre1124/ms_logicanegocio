import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CategoryProduct extends BaseModel {

  @column({ isPrimary: true }) // Define 'id' como clave primaria.
  public id: number

  @column() // Define la clave foránea para el producto.
  public product_id: number

  @column() // Define la clave foránea para la categoría.
  public category_id: number
}
