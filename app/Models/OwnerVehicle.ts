import { DateTime } from 'luxon' // Importa la librería Luxon para trabajar con fechas y horas de manera eficiente.
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm' // Importa las clases y decoradores de Lucid ORM para trabajar con modelos y relaciones en la base de datos.
import Vehiculo from './Vehiculo' // Importa el modelo 'Vehiculo', que representa los vehículos.
import Dueno from './Dueno' // Importa el modelo 'Dueno', que representa a los propietarios de los vehículos.

export default class OwnerVehicle extends BaseModel { // Define la clase 'OwnerVehicle', que extiende de 'BaseModel' de AdonisJS. Esto significa que es un modelo de base de datos.
  
  @column({ isPrimary: true }) // Define la propiedad 'id' como clave primaria en la base de datos.
  public id: number // Propiedad para almacenar el ID del registro de la relación entre el dueño y el vehículo.

  @column() // Define la propiedad 'fechaAsignacion' como una columna en la base de datos.
  public fechaAsignacion: DateTime // Propiedad para almacenar la fecha de asignación del vehículo al dueño.

  @column() // Define la propiedad 'fechaDesasignacion' como una columna en la base de datos.
  public fechaDesasignacion: DateTime // Propiedad para almacenar la fecha de desasignación del vehículo del dueño.

  @column() // Define la propiedad 'vehiculo_id' como una columna en la base de datos.
  public vehiculo_id: number // Propiedad para almacenar el ID del vehículo relacionado con este registro.

  @column() // Define la propiedad 'dueno_id' como una columna en la base de datos.
  public dueno_id: number // Propiedad para almacenar el ID del dueño relacionado con este registro.

  @column.dateTime({ autoCreate: true }) // Define la propiedad 'createdAt' como una columna de tipo DateTime que se asigna automáticamente al crear el registro.
  public createdAt: DateTime // Propiedad para almacenar la fecha de creación del registro.

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Define la propiedad 'updatedAt' como una columna de tipo DateTime que se actualiza automáticamente tanto al crear como al modificar el registro.
  public updatedAt: DateTime // Propiedad para almacenar la fecha de la última actualización del registro.

  // Relación 'BelongsTo' que indica que cada registro de 'OwnerVehicle' pertenece a un vehículo (uno a uno).
  @belongsTo(() => Vehiculo, {
    foreignKey: 'vehiculo_id' // La clave foránea 'vehiculo_id' en 'OwnerVehicle' que hace referencia al modelo 'Vehiculo'.
  })
  public vehiculo: BelongsTo<typeof Vehiculo> // Propiedad para acceder al vehículo asociado con este registro.

  // Relación 'BelongsTo' que indica que cada registro de 'OwnerVehicle' pertenece a un dueño (uno a uno).
  @belongsTo(() => Dueno, {
    foreignKey: 'dueno_id' // La clave foránea 'dueno_id' en 'OwnerVehicle' que hace referencia al modelo 'Dueno'.
  })
  public dueno: BelongsTo<typeof Dueno> // Propiedad para acceder al dueño asociado con este registro.
}
