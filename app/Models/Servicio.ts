import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm'
import Spent from './Spent'
import Conductor from './Conductor'

export default class Servicio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descripcion: string

  @column()
  public costo: Number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Spent, {
    foreignKey: 'servicio_id'
  })
  public spents: HasMany<typeof Spent>

  @hasManyThrough([() => Conductor, () => Spent], {
    localKey: 'id', // ID en Vehiculo
    foreignKey: 'servicio_id', // Clave foránea en VehicleDriver
    throughLocalKey: 'conductor_id', // Clave foránea en VehicleDriver que referencia al conductor
    throughForeignKey: 'id' // ID en Conductor
  })
  public conductores: HasManyThrough<typeof Conductor>
}
