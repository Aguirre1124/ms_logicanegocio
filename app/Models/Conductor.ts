import { DateTime } from 'luxon' // Importa la librería Luxon para manejar fechas y horas.
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm' // Importa las clases y decoradores de Lucid ORM para modelar la base de datos.
import VehicleDriver from './VehicleDriver' // Importa el modelo VehicleDriver, que representa la relación entre vehículos y conductores.
import Vehiculo from './Vehiculo' // Importa el modelo Vehiculo, que representa los vehículos en la base de datos.
import Spent from './Spent' // Importa el modelo Spent, que representa los gastos asociados a un conductor.
import Servicio from './Servicio' // Importa el modelo Servicio, que representa los servicios asociados a un conductor.

export default class Conductor extends BaseModel { // Define la clase "Conductor" que extiende de "BaseModel" de AdonisJS.
  
  @column({ isPrimary: true }) // Define la columna 'id' como clave primaria en la base de datos.
  public id: number // Propiedad para el ID del conductor.

  @column() // Define la columna 'nombre' en la base de datos.
  public nombre: string // Propiedad para el nombre del conductor.

  @column() // Define la columna 'licencia' en la base de datos.
  public licencia: string // Propiedad para el número de licencia del conductor.

  @column() // Define la columna 'tipo_licencia' en la base de datos.
  public tipo_licencia: string // Propiedad para el tipo de licencia del conductor.

  @column() // Define la columna 'telefono' en la base de datos.
  public telefono: string // Propiedad para el número de teléfono del conductor.

  @column() // Define la columna 'email' en la base de datos.
  public email: string // Propiedad para el correo electrónico del conductor.

  @column.dateTime({ autoCreate: true }) // Define la columna 'createdAt' como una fecha de creación, se autoasigna al crear un registro.
  public createdAt: DateTime // Propiedad para la fecha de creación del registro.

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Define la columna 'updatedAt' como fecha que se actualiza automáticamente al modificar el registro.
  public updatedAt: DateTime // Propiedad para la fecha de actualización del registro.

  // Relación uno a muchos con el modelo VehicleDriver
  @hasMany(() => VehicleDriver, { 
    foreignKey: 'conductor_id' // Define la clave foránea 'conductor_id' en la tabla 'VehicleDriver'.
  })
  public vehicledrivers: HasMany<typeof VehicleDriver> // Propiedad para acceder a los "VehicleDriver" asociados a este conductor.

  // Relación muchos a muchos a través de la tabla intermedia 'VehicleDriver' con el modelo Vehiculo.
  @hasManyThrough([() => Vehiculo, () => VehicleDriver], {
    localKey: 'id', // La clave local en 'Conductor' (es decir, 'id').
    foreignKey: 'conductor_id', // La clave foránea en la tabla 'VehicleDriver' que apunta a 'Conductor'.
    throughLocalKey: 'vehiculo_id', // La clave foránea en 'VehicleDriver' que apunta a 'Vehiculo'.
    throughForeignKey: 'id' // La clave primaria en 'Vehiculo' (es decir, 'id').
  })
  public vehiculos: HasManyThrough<typeof Vehiculo> // Propiedad para acceder a los vehículos asociados al conductor a través de 'VehicleDriver'.

  // Relación uno a muchos con el modelo Spent.
  @hasMany(() => Spent, { 
    foreignKey: 'conductor_id' // Define la clave foránea 'conductor_id' en la tabla 'Spent'.
  })
  public spents: HasMany<typeof Spent> // Propiedad para acceder a los gastos (Spent) asociados al conductor.

  // Relación muchos a muchos a través de la tabla intermedia 'Spent' con el modelo Servicio.
  @hasManyThrough([() => Servicio, () => Spent], {
    localKey: 'id', // La clave local en 'Conductor' (es decir, 'id').
    foreignKey: 'conductor_id', // La clave foránea en la tabla 'Spent' que apunta a 'Conductor'.
    throughLocalKey: 'servicio_id', // La clave foránea en 'Spent' que apunta a 'Servicio'.
    throughForeignKey: 'id' // La clave primaria en 'Servicio' (es decir, 'id').
  })
  public servicios: HasManyThrough<typeof Servicio> // Propiedad para acceder a los servicios asociados al conductor a través de 'Spent'.

}
