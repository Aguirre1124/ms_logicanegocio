import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm';
import Spent from './Spent';
import Conductor from './Conductor';

export default class Servicio extends BaseModel {

  @column({ isPrimary: true })
  public id: number;

  @column()
  public descripcion: string;

  @column()
  public costo: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Spent, {
    foreignKey: 'servicio_id'
  })
  public spents: HasMany<typeof Spent>;

  @hasManyThrough([() => Conductor, () => Spent], {
    localKey: 'id',
    foreignKey: 'servicio_id',
    throughLocalKey: 'conductor_id',
    throughForeignKey: 'id'
  })
  public conductores: HasManyThrough<typeof Conductor>;
}