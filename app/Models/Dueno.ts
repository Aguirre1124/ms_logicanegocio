import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm';
import OwnerVehicle from './OwnerVehicle';
import Vehiculo from './Vehiculo';

export default class Dueno extends BaseModel {

  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public gmail: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => OwnerVehicle, {
    foreignKey: 'dueno_id'
  })
  public ownervehicles: HasMany<typeof OwnerVehicle>;

  @hasManyThrough([() => Vehiculo, () => OwnerVehicle], {
    localKey: 'id',
    foreignKey: 'dueno_id',
    throughLocalKey: 'vehiculo_id',
    throughForeignKey: 'id'
  })
  public vehiculos: HasManyThrough<typeof Vehiculo>;

}