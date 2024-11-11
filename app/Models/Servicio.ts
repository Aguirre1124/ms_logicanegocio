import { DateTime } from 'luxon' // Importa la librería Luxon para trabajar con fechas y horas de manera eficiente.
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm' // Importa las clases y decoradores de Lucid ORM para trabajar con modelos y relaciones en la base de datos.
import Spent from './Spent' // Importa el modelo 'Spent', que representa los gastos asociados a un servicio.
import Conductor from './Conductor' // Importa el modelo 'Conductor', que representa a los conductores.

export default class Servicio extends BaseModel { // Define la clase 'Servicio', que extiende de 'BaseModel' de AdonisJS. Esto significa que es un modelo de base de datos.

  @column({ isPrimary: true }) // Define la propiedad 'id' como clave primaria en la base de datos.
  public id: number // Propiedad para almacenar el ID único del servicio.

  @column() // Define la propiedad 'descripcion' como una columna en la base de datos.
  public descripcion: string // Propiedad para almacenar la descripción del servicio (por ejemplo, tipo de servicio, detalles, etc.).

  @column() // Define la propiedad 'costo' como una columna en la base de datos.
  public costo: Number // Propiedad para almacenar el costo del servicio.

  @column.dateTime({ autoCreate: true }) // Define la propiedad 'createdAt' como una columna de tipo DateTime que se asigna automáticamente al crear el registro.
  public createdAt: DateTime // Propiedad para almacenar la fecha de creación del servicio.

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Define la propiedad 'updatedAt' como una columna de tipo DateTime que se actualiza automáticamente tanto al crear como al modificar el registro.
  public updatedAt: DateTime // Propiedad para almacenar la fecha de la última actualización del servicio.

  // Relación 'HasMany' que indica que un servicio puede tener muchos gastos asociados.
  @hasMany(() => Spent, {
    foreignKey: 'servicio_id' // La clave foránea 'servicio_id' en 'Spent' que hace referencia a este servicio.
  })
  public spents: HasMany<typeof Spent> // Propiedad para acceder a los gastos asociados a este servicio.

  // Relación 'HasManyThrough' que indica que un servicio puede estar relacionado con muchos conductores a través de los gastos asociados.
  @hasManyThrough([() => Conductor, () => Spent], {
    localKey: 'id', // ID en Servicio
    foreignKey: 'servicio_id', // Clave foránea en Spent que hace referencia al servicio
    throughLocalKey: 'conductor_id', // Clave foránea en Spent que hace referencia al conductor
    throughForeignKey: 'id' // ID en Conductor
  })
  public conductores: HasManyThrough<typeof Conductor> // Propiedad para acceder a los conductores asociados a este servicio a través de los gastos.
}
