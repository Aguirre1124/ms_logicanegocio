import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Cuota from './Cuota';

export default class Contract extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_inicio: Date;

  @column()
  public fecha_fin: Date;

  @column()
  public estado: string

  @column()
  public detalles_servicio: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Cuota,{
    // nombre de la clave foránea en el modelo Cuota
    foreignKey: 'contract_id'
  })
  public cuotas: HasMany<typeof Cuota>
}
