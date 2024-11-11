import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Servicio from './Servicio'

export default class Administrator extends BaseModel {

  @column({ isPrimary: true }) // Define 'id' como clave primaria.
  public id: number

  @column() // Define el nombre del administrador.
  public name: string

 @column()
  public email: string

  @column()
  public phone_number: number

  // Relación uno a uno con Service.
  @hasOne(() => Servicio, {
    foreignKey: 'administrator_id' // Clave foránea en Service que apunta a Administrator.
  })
  public service: HasOne<typeof Servicio>
}
