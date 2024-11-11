import { DateTime } from 'luxon' // Importa la librería Luxon para manejar fechas y horas de manera fácil.
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm' // Importa las clases y decoradores de Lucid ORM para trabajar con modelos y relaciones en la base de datos.
import Cuota from './Cuota' // Importa el modelo 'Cuota', que representa las cuotas asociadas a un contrato.

export default class Contract extends BaseModel { // Define la clase 'Contract' que extiende de 'BaseModel' de AdonisJS. Esto indica que es un modelo de base de datos.

  @column({ isPrimary: true }) // Define la propiedad 'id' como clave primaria en la tabla de la base de datos.
  public id: number // Propiedad para el ID del contrato.

  @column() // Define la propiedad 'fecha_inicio' como una columna en la base de datos.
  public fecha_inicio: Date; // Propiedad para almacenar la fecha de inicio del contrato.

  @column() // Define la propiedad 'fecha_fin' como una columna en la base de datos.
  public fecha_fin: Date; // Propiedad para almacenar la fecha de finalización del contrato.

  @column() // Define la propiedad 'estado' como una columna en la base de datos.
  public estado: string // Propiedad para almacenar el estado del contrato (activo, cancelado, etc.).

  @column() // Define la propiedad 'detalles_servicio' como una columna en la base de datos.
  public detalles_servicio: string // Propiedad para almacenar los detalles del servicio relacionado con el contrato.

  @column.dateTime({ autoCreate: true }) // Define la propiedad 'createdAt' como una columna de tipo DateTime, que se establece automáticamente cuando se crea el registro.
  public createdAt: DateTime // Propiedad para la fecha de creación del contrato.

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Define la propiedad 'updatedAt' como una columna de tipo DateTime, que se establece automáticamente tanto al crear como al actualizar el registro.
  public updatedAt: DateTime // Propiedad para la fecha de la última actualización del contrato.

  // Relación uno a muchos entre 'Contract' y 'Cuota'.
  @hasMany(() => Cuota, {
    foreignKey: 'contract_id' // Define la clave foránea en el modelo 'Cuota' que hace referencia a 'Contract'.
  })
  public cuotas: HasMany<typeof Cuota> // Propiedad que accede a las cuotas asociadas al contrato.
}
