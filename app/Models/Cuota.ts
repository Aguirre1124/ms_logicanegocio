import { DateTime } from 'luxon' // Importa la librería Luxon para manejar fechas y horas de manera eficiente.
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm' // Importa las clases y decoradores de Lucid ORM para trabajar con modelos y relaciones en la base de datos.
import Contract from './Contract' // Importa el modelo 'Contract', que representa un contrato.
import Factura from './Factura' // Importa el modelo 'Factura', que representa las facturas asociadas a una cuota.

export default class Cuota extends BaseModel { // Define la clase 'Cuota', que extiende de 'BaseModel' de AdonisJS. Esto indica que es un modelo de base de datos.
  
  @column({ isPrimary: true }) // Define la propiedad 'id' como clave primaria en la base de datos.
  public id: number // Propiedad para el ID de la cuota.

  @column() // Define la propiedad 'monto' como una columna en la base de datos.
  public monto: number // Propiedad para almacenar el monto de la cuota.

  @column() // Define la propiedad 'fecha_vencimiento' como una columna en la base de datos.
  public fecha_vencimiento: Date; // Propiedad para almacenar la fecha de vencimiento de la cuota.

  @column() // Define la propiedad 'estado_pago' como una columna en la base de datos.
  public estado_pago: string // Propiedad para almacenar el estado del pago de la cuota (pendiente, pagado, etc.).

  @column() // Define la propiedad 'contract_id' como una columna en la base de datos, que almacenará la referencia al contrato asociado a la cuota.
  public contract_id: number // Propiedad para almacenar la clave foránea que vincula la cuota con un contrato.

  @column.dateTime({ autoCreate: true }) // Define la propiedad 'createdAt' como una columna de tipo DateTime, que se establece automáticamente al crear el registro.
  public createdAt: DateTime // Propiedad para almacenar la fecha de creación de la cuota.

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Define la propiedad 'updatedAt' como una columna de tipo DateTime, que se actualiza automáticamente al modificar el registro.
  public updatedAt: DateTime // Propiedad para almacenar la fecha de la última actualización de la cuota.

  // Relación 'BelongsTo' que indica que la cuota pertenece a un contrato (uno a muchos).
  @belongsTo(() => Contract, {
    foreignKey: 'contract_id' // Define la clave foránea 'contract_id' en la tabla 'Cuota' que hace referencia al modelo 'Contract'.
  })
  public contract: BelongsTo<typeof Contract> // Propiedad para acceder al contrato asociado a la cuota.

  // Relación 'HasOne' que indica que una cuota puede tener una única factura asociada (uno a uno).
  @hasOne(() => Factura, {
    foreignKey: 'cuota_id', // Define la clave foránea en la tabla 'Factura' que hace referencia al ID de la cuota.
  })
  public factura: HasOne<typeof Factura> // Propiedad para acceder a la factura asociada a la cuota.
}
