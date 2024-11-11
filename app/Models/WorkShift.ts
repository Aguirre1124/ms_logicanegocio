import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'

export default class WorkShift extends BaseModel {

  @column({ isPrimary: true }) // Define 'id' como clave primaria.
  public id: number

  @column() // Define la hora de inicio del turno.
  public startTime: DateTime

  @column() // Define la hora de finalización del turno.
  public endTime: DateTime

  // Relación muchos a uno con Conductor (varios turnos pueden estar asociados a un conductor).
  @belongsTo(() => Conductor, {
    foreignKey: 'conductor_id' // Clave foránea en WorkShift que apunta a Conductor.
  })
  
  public conductor: BelongsTo<typeof Conductor>
}
