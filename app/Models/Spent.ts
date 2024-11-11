import { DateTime } from 'luxon' // Importa la librería Luxon para trabajar con fechas y horas de manera eficiente.
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm' // Importa las clases y decoradores de Lucid ORM para trabajar con modelos y relaciones en la base de datos.
import Servicio from './Servicio' // Importa el modelo 'Servicio', que representa los servicios ofrecidos.
import Conductor from './Conductor' // Importa el modelo 'Conductor', que representa a los conductores.
import Factura from './Factura' // Importa el modelo 'Factura', que representa las facturas asociadas.

export default class Spent extends BaseModel { // Define la clase 'Spent', que extiende de 'BaseModel' de AdonisJS. Esto significa que es un modelo de base de datos.

  @column({ isPrimary: true }) // Define la propiedad 'id' como clave primaria en la base de datos.
  public id: number // Propiedad para almacenar el ID único de la transacción de gasto.

  @column() // Define la propiedad 'description' como una columna en la base de datos.
  public description: string // Propiedad para almacenar una descripción del gasto (por ejemplo, motivo del gasto, detalles, etc.).

  @column() // Define la propiedad 'monto' como una columna en la base de datos.
  public monto: number // Propiedad para almacenar el monto (cantidad de dinero) del gasto.

  @column() // Define la propiedad 'date' como una columna en la base de datos.
  public date: DateTime // Propiedad para almacenar la fecha en que ocurrió el gasto. Es un objeto DateTime de Luxon.

  @column() // Define la propiedad 'servicio_id' como una columna en la base de datos.
  public servicio_id: number // Propiedad para almacenar el ID del servicio relacionado con el gasto.

  @column() // Define la propiedad 'conductor_id' como una columna en la base de datos.
  public conductor_id: number // Propiedad para almacenar el ID del conductor relacionado con el gasto.

  @column.dateTime({ autoCreate: true }) // Define la propiedad 'createdAt' como una columna de tipo DateTime que se asigna automáticamente al crear el registro.
  public createdAt: DateTime // Propiedad para almacenar la fecha de creación del registro de gasto.

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Define la propiedad 'updatedAt' como una columna de tipo DateTime que se actualiza automáticamente tanto al crear como al modificar el registro.
  public updatedAt: DateTime // Propiedad para almacenar la fecha de la última actualización del registro de gasto.

  // Relación 'BelongsTo' que indica que un gasto pertenece a un servicio.
  @belongsTo(() => Servicio, {
    foreignKey: 'servicio_id' // La clave foránea 'servicio_id' en 'Spent' que hace referencia al servicio.
  })
  public servicio: BelongsTo<typeof Servicio> // Propiedad para acceder al servicio relacionado con este gasto.

  // Relación 'BelongsTo' que indica que un gasto pertenece a un conductor.
  @belongsTo(() => Conductor, {
    foreignKey: 'conductor_id' // La clave foránea 'conductor_id' en 'Spent' que hace referencia al conductor.
  })
  public conductor: BelongsTo<typeof Conductor> // Propiedad para acceder al conductor relacionado con este gasto.

  // Relación 'BelongsTo' que indica que un gasto pertenece a una factura.
  @belongsTo(() => Factura, {
    foreignKey: 'factura_id', // La clave foránea 'factura_id' en 'Spent' que hace referencia a la factura.
  })
  public factura: BelongsTo<typeof Factura> // Propiedad para acceder a la factura relacionada con este gasto.
}
