import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'

export default class User extends BaseModel {

  @column({ isPrimary: true }) // Define 'id' como clave primaria.
  public id: number

  @column() // Define el nombre del usuario.
  public name: string

  @column.dateTime({ autoCreate: true }) // Fecha de creación automática.
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Fecha de actualización automática.
  public updatedAt: DateTime

  // Relación directa con Servicio.
  @belongsTo(() => Servicio, {
    foreignKey: 'servicio_id' // Clave foránea en User que apunta a Servicio.
  })
  public Servicio: BelongsTo<typeof Servicio>
}
