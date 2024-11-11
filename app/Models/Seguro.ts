import { DateTime } from 'luxon' // Importa la librería Luxon para trabajar con fechas y horas de manera eficiente.
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm' // Importa las clases y decoradores de Lucid ORM para trabajar con modelos y columnas en la base de datos.

export default class Seguro extends BaseModel { // Define la clase 'Seguro', que extiende de 'BaseModel' de AdonisJS. Esto significa que es un modelo de base de datos.

  @column({ isPrimary: true }) // Define la propiedad 'id' como clave primaria en la base de datos.
  public id: number // Propiedad para almacenar el ID único del seguro.

  @column() // Define la propiedad 'compania' como una columna en la base de datos.
  public compania: string // Propiedad para almacenar el nombre de la compañía de seguros.

  @column() // Define la propiedad 'numeroPoliza' como una columna en la base de datos.
  public numeroPoliza: number // Propiedad para almacenar el número de la póliza del seguro.

  @column() // Define la propiedad 'fechaVencimiento' como una columna en la base de datos.
  public fechaVencimiento: Date // Propiedad para almacenar la fecha de vencimiento del seguro.

  @column.dateTime({ autoCreate: true }) // Define la propiedad 'createdAt' como una columna de tipo DateTime que se asigna automáticamente al crear el registro.
  public createdAt: DateTime // Propiedad para almacenar la fecha de creación del registro de seguro.

  @column.dateTime({ autoCreate: true, autoUpdate: true }) // Define la propiedad 'updatedAt' como una columna de tipo DateTime que se actualiza automáticamente tanto al crear como al modificar el registro.
  public updatedAt: DateTime // Propiedad para almacenar la fecha de la última actualización del registro de seguro.
}

