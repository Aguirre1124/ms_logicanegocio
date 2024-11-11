import { DateTime } from 'luxon' // Importa la librería Luxon para trabajar con fechas y horas de manera eficiente.
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm' // Importa las clases y decoradores de Lucid ORM para trabajar con modelos y relaciones en la base de datos.
import Cuota from './Cuota' // Importa el modelo 'Cuota', que representa las cuotas asociadas a las facturas.
import Spent from './Spent' // Importa el modelo 'Spent', que representa los gastos asociados a la factura.

export default class Factura extends BaseModel { // Define la clase 'Factura', que extiende de 'BaseModel' de AdonisJS. Esto indica que es un modelo de base de datos.

  @column({ isPrimary: true }) // Define la propiedad 'id' como clave primaria en la base de datos.
  public id: number // Propiedad para almacenar el ID de la factura.

  @column() // Define la propiedad 'fecha_emision' como una columna en la base de datos.
  public fecha_emision: string // Propiedad para almacenar la fecha de emisión de la factura, como una cadena de texto.

  @column() // Define la propiedad 'monto_total' como una columna en la base de datos.
  public monto_total: number // Propiedad para almacenar el monto total de la factura.

  @column() // Define la propiedad 'estado' como una columna en la base de datos.
  public estado: string // Propiedad para almacenar el estado de la factura (por ejemplo, pagada, pendiente, etc.).

  @column() // Define la propiedad 'cuota_id' como una columna en la base de datos.
  public cuota_id: number // Propiedad para almacenar la clave foránea que relaciona la factura con una cuota específica.

  @column.dateTime({ autoCreate: true }) // Define la propiedad 'createdAt' como una columna de tipo DateTime que se asigna automáticamente al crear el registro.
  public createdAt: DateTime // Propiedad para almacenar la fecha de creación de la factura.

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Define la propiedad 'updatedAt' como una columna de tipo DateTime que se actualiza automáticamente tanto al crear como al modificar el registro.
  public updatedAt: DateTime // Propiedad para almacenar la fecha de la última actualización de la factura.

  // Relación 'BelongsTo' que indica que la factura pertenece a una cuota (uno a uno).
  @belongsTo(() => Cuota, {
    foreignKey: 'cuota_id', // La clave foránea en 'Factura' que hace referencia a 'Cuota'.
  })
  public cuota: BelongsTo<typeof Cuota> // Propiedad para acceder a la cuota asociada a la factura.

  // Relación 'HasOne' que indica que una factura puede tener un único gasto asociado (uno a uno).
  @hasOne(() => Spent, {
    foreignKey: 'factura_id', // La clave foránea en 'Spent' que hace referencia a 'Factura'.
  })
  public spent: HasOne<typeof Spent> // Propiedad para acceder al gasto asociado a la factura.
}
