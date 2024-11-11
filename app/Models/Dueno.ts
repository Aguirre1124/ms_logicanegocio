import { DateTime } from 'luxon' // Importa la librería Luxon para trabajar con fechas y horas de manera eficiente.
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm' // Importa las clases y decoradores de Lucid ORM para trabajar con modelos y relaciones en la base de datos.
import OwnerVehicle from './OwnerVehicle' // Importa el modelo 'OwnerVehicle', que representa la relación entre los propietarios y los vehículos.
import Vehiculo from './Vehiculo' // Importa el modelo 'Vehiculo', que representa los vehículos.

export default class Dueno extends BaseModel { // Define la clase 'Dueno', que extiende de 'BaseModel' de AdonisJS. Esto significa que es un modelo de base de datos.

  @column({ isPrimary: true }) // Define la propiedad 'id' como clave primaria en la base de datos.
  public id: number // Propiedad para el ID del dueño del vehículo.

  @column() // Define la propiedad 'nombre' como una columna en la base de datos.
  public nombre: string // Propiedad para almacenar el nombre del dueño del vehículo.

  @column() // Define la propiedad 'gmail' como una columna en la base de datos.
  public gmail: string // Propiedad para almacenar el correo electrónico del dueño.

  @column.dateTime({ autoCreate: true }) // Define la propiedad 'createdAt' como una columna de tipo DateTime que se asigna automáticamente al crear el registro.
  public createdAt: DateTime // Propiedad para almacenar la fecha de creación del registro.

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Define la propiedad 'updatedAt' como una columna de tipo DateTime que se actualiza automáticamente tanto al crear como al modificar el registro.
  public updatedAt: DateTime // Propiedad para almacenar la fecha de la última actualización del registro.

  // Relación uno a muchos con el modelo 'OwnerVehicle'.
  @hasMany(() => OwnerVehicle, {
    foreignKey: 'dueno_id' // Define la clave foránea 'dueno_id' en la tabla 'OwnerVehicle' que hace referencia al dueño.
  })
  public ownervehicles: HasMany<typeof OwnerVehicle> // Propiedad para acceder a los vehículos asociados a este dueño a través del modelo 'OwnerVehicle'.

  // Relación muchos a muchos a través de la tabla intermedia 'OwnerVehicle' con el modelo 'Vehiculo'.
  @hasManyThrough([() => Vehiculo, () => OwnerVehicle], {
    localKey: 'id', // La clave local en 'Dueno' (es decir, 'id').
    foreignKey: 'dueno_id', // La clave foránea en 'OwnerVehicle' que apunta a 'Dueno'.
    throughLocalKey: 'vehiculo_id', // La clave foránea en 'OwnerVehicle' que apunta a 'Vehiculo'.
    throughForeignKey: 'id' // La clave primaria en 'Vehiculo' (es decir, 'id').
  })
  public vehiculos: HasManyThrough<typeof Vehiculo> // Propiedad para acceder a los vehículos asociados al dueño a través de la relación intermedia 'OwnerVehicle'.
}
