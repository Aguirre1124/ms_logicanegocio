import { DateTime } from 'luxon' // Importa la librería Luxon para manejar fechas y horas de manera eficiente.
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm' // Importa las clases necesarias de Lucid ORM para definir modelos y relaciones con la base de datos.
import Vehiculo from './Vehiculo' // Importa el modelo 'Vehiculo', que representa un vehículo.
import Conductor from './Conductor' // Importa el modelo 'Conductor', que representa un conductor.

export default class VehicleDriver extends BaseModel { // Define el modelo 'VehicleDriver', que extiende de 'BaseModel', lo que indica que este es un modelo de base de datos.

  @column({ isPrimary: true }) // Define la propiedad 'id' como clave primaria de la base de datos.
  public id: number // Propiedad para almacenar el ID único de la relación entre el conductor y el vehículo.

  @column.date() // Define la propiedad 'fecha_asignacion' como una columna de tipo 'date' en la base de datos.
  public fecha_asignacion: DateTime // Propiedad para almacenar la fecha en que el conductor fue asignado al vehículo.

  @column.date() // Define la propiedad 'fecha_desasignacion' como una columna de tipo 'date' en la base de datos.
  public fecha_desasignacion: DateTime // Propiedad para almacenar la fecha en que el conductor fue desasignado del vehículo.

  @column() // Define la propiedad 'vehiculo_id' como una columna en la base de datos.
  public vehiculo_id: number // Propiedad para almacenar el ID del vehículo asociado al conductor en esta relación.

  @column() // Define la propiedad 'conductor_id' como una columna en la base de datos.
  public conductor_id: number // Propiedad para almacenar el ID del conductor asociado al vehículo en esta relación.

  @column.dateTime({ autoCreate: true }) // Define la propiedad 'createdAt' como una columna que almacena la fecha de creación del registro, asignada automáticamente.
  public createdAt: DateTime // Propiedad para almacenar la fecha en que fue creado el registro.

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Define la propiedad 'updatedAt' como una columna que almacena la fecha de la última actualización del registro, asignada automáticamente.
  public updatedAt: DateTime // Propiedad para almacenar la fecha en que fue actualizado el registro.

  // Relación 'BelongsTo' que indica que un 'VehicleDriver' pertenece a un 'Vehiculo'.
  @belongsTo(() => Vehiculo, {
    foreignKey: 'vehiculo_id' // La clave foránea 'vehiculo_id' en el modelo 'VehicleDriver' que hace referencia al vehículo.
  })
  public vehiculo: BelongsTo<typeof Vehiculo> // Propiedad para acceder al vehículo asociado a este conductor.

  // Relación 'BelongsTo' que indica que un 'VehicleDriver' pertenece a un 'Conductor'.
  @belongsTo(() => Conductor, {
    foreignKey: 'conductor_id' // La clave foránea 'conductor_id' en el modelo 'VehicleDriver' que hace referencia al conductor.
  })
  public conductor: BelongsTo<typeof Conductor> // Propiedad para acceder al conductor asociado a este vehículo.
}
