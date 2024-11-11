import { DateTime } from 'luxon' // Importa la librería Luxon para manejar fechas y horas de manera eficiente.
import { BaseModel, column, ManyToMany, manyToMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm' // Importa las clases y decoradores de Lucid ORM.
import Product from './Product' // Importa el modelo Product, que representa los productos.

export default class Category extends BaseModel { // Define la clase 'Category', que extiende de 'BaseModel' de AdonisJS.

  @column({ isPrimary: true }) // Define 'id' como clave primaria en la base de datos.
  public id: number

  @column() // Define el nombre de la categoría.
  public name: string

  @column.dateTime({ autoCreate: true }) // Fecha de creación automática.
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Fecha de actualización automática.
  public updatedAt: DateTime

  // Relación reflexiva muchos a muchos con Category (para subcategorías).
  @manyToMany(() => Category, {
    localKey: 'id', // La clave local de Category.
    relatedKey: 'id', // La clave relacionada con la otra categoría (subcategoría).
    pivotForeignKey: 'category_id', // Clave foránea en la tabla intermedia que hace referencia a 'Category'.
    pivotRelatedForeignKey: 'related_category_id' // Clave foránea en la tabla intermedia que hace referencia a la subcategoría.
  })
  public subcategories: ManyToMany<typeof Category> // Propiedad para acceder a las subcategorías asociadas.

  // Relación muchos a muchos con Product a través de la tabla intermedia 'category_products'.
  @hasManyThrough([() => Product, () => Category], {
    localKey: 'id', // La clave local en Category (se refiere al 'id' de la categoría principal).
    foreignKey: 'category_id', // Clave foránea en la tabla intermedia que apunta a Category.
    throughLocalKey: 'product_id', // Clave foránea en la tabla intermedia que apunta a 'Product'.
    throughForeignKey: 'id' // Clave primaria en 'Product' (es decir, 'id').
  })
  public products: HasManyThrough<typeof Product> // Propiedad para acceder a los productos asociados a la categoría a través de la relación intermedia.
}
