import { DateTime } from 'luxon' // Importa la librería Luxon para manejar fechas y horas.
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm' // Importa las clases necesarias de Lucid ORM para trabajar con la base de datos y definir relaciones entre modelos.
import VehicleDriver from './VehicleDriver' // Importa el modelo 'VehicleDriver', que representa la relación entre un conductor y un vehículo.
import Conductor from './Conductor' // Importa el modelo 'Conductor', que representa a un conductor.
import OwnerVehicle from './OwnerVehicle' // Importa el modelo 'OwnerVehicle', que representa la relación entre un propietario y un vehículo.
import Dueno from './Dueno' // Importa el modelo 'Dueno', que representa a un propietario (dueño) de un vehículo.

export default class Vehiculo extends BaseModel { // Define el modelo 'Vehiculo', que extiende de 'BaseModel' y representa un vehículo.

  @column({ isPrimary: true }) // Define la propiedad 'id' como clave primaria de la base de datos.
  public id: number // Propiedad para almacenar el ID único del vehículo.

  @column() // Define la propiedad 'tipo_vehiculo' como una columna en la base de datos.
  public tipo_vehiculo: string // Propiedad para almacenar el tipo de vehículo (por ejemplo, automóvil, camión, etc.).

  @column() // Define la propiedad 'capacidad_peso' como una columna en la base de datos.
  public capacidad_peso: number // Propiedad para almacenar la capacidad de carga en peso del vehículo (por ejemplo, en kilogramos).

  @column() // Define la propiedad 'capacidad_volumen' como una columna en la base de datos.
  public capacidad_volumen: number // Propiedad para almacenar la capacidad de carga en volumen del vehículo (por ejemplo, en metros cúbicos).

  @column() // Define la propiedad 'estado' como una columna en la base de datos.
  public estado: string // Propiedad para almacenar el estado del vehículo (por ejemplo, 'disponible', 'en mantenimiento', etc.).

  @column.dateTime({ autoCreate: true }) // Define la propiedad 'createdAt' como una columna que almacena la fecha de creación, asignada automáticamente.
  public createdAt: DateTime // Propiedad para almacenar la fecha en que se creó el registro.

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Define la propiedad 'updatedAt' como una columna que almacena la fecha de la última actualización, asignada automáticamente.
  public updatedAt: DateTime // Propiedad para almacenar la fecha en que se actualizó el registro por última vez.

  // Relación 'HasMany' que indica que un vehículo puede tener muchos registros de 'VehicleDriver'.
  @hasMany(() => VehicleDriver, {
    foreignKey: 'vehiculo_id' // La clave foránea en el modelo 'VehicleDriver' que hace referencia al vehículo.
  })
  public vehicledrivers: HasMany<typeof VehicleDriver> // Propiedad para acceder a todos los conductores asignados a este vehículo.

  // Relación 'HasMany' que indica que un vehículo puede tener muchos registros de 'OwnerVehicle'.
  @hasMany(() => OwnerVehicle, {
    foreignKey: 'vehiculo_id' // La clave foránea en el modelo 'OwnerVehicle' que hace referencia al vehículo.
  })
  public ownervehicles: HasMany<typeof OwnerVehicle> // Propiedad para acceder a todos los propietarios asociados a este vehículo.

  // Relación 'HasManyThrough' que indica que un vehículo tiene muchos conductores a través de la relación 'VehicleDriver'.
  @hasManyThrough([() => Conductor, () => VehicleDriver], {
    localKey: 'id', // ID en el vehículo.
    foreignKey: 'vehiculo_id', // Clave foránea en 'VehicleDriver' que hace referencia al vehículo.
    throughLocalKey: 'conductor_id', // Clave foránea en 'VehicleDriver' que hace referencia al conductor.
    throughForeignKey: 'id' // ID en el conductor.
  })
  public conductores: HasManyThrough<typeof Conductor> // Propiedad para acceder a todos los conductores asociados a este vehículo a través de la relación 'VehicleDriver'.

  // Relación 'HasManyThrough' que indica que un vehículo tiene muchos dueños a través de la relación 'OwnerVehicle'.
  @hasManyThrough([() => Dueno, () => OwnerVehicle], {
    localKey: 'id', // ID en el vehículo.
    foreignKey: 'vehiculo_id', // Clave foránea en 'OwnerVehicle' que hace referencia al vehículo.
    throughLocalKey: 'dueno_id', // Clave foránea en 'OwnerVehicle' que hace referencia al dueño.
    throughForeignKey: 'id' // ID en el dueño.
  })
  public duenos: HasManyThrough<typeof Dueno> // Propiedad para acceder a todos los propietarios (dueños) asociados a este vehículo a través de la relación 'OwnerVehicle'.
}
