import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
// import Route from './Route'
// import Schedule from './Schedule'

export default class Batch extends BaseModel {

  @column({ isPrimary: true }) // Define 'id' como clave primaria.
  public id: number

  @column() // Define la cantidad de productos en el lote.
  public quantity: number

  @column.dateTime({ autoCreate: true }) // Fecha de creación automática.
  public createdAt: DateTime

  // Relación uno a muchos con Product (un lote puede incluir varios productos).
  @hasMany(() => Product, {
    foreignKey: 'batch_id' // Clave foránea en Product que apunta a Batch.
  })
  public products: HasMany<typeof Product>

  // Relación uno a muchos con Route (un lote está asociado a una ruta).
  // @hasMany(() => Route, {
  //   foreignKey: 'batch_id' // Clave foránea en Route que apunta a Batch.
  // })
  // public routes: HasMany<typeof Route>

  // Relación uno a uno con Schedule (intermedia entre Address y Route).
  // @hasOne(() => Schedule, {
  //   foreignKey: 'batch_id' // Clave foránea en Schedule que apunta a Batch.
  // })
  // public schedule: HasOne<typeof Schedule>
}
