import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm';
import VehicleDriver from './VehicleDriver';
import Conductor from './Conductor';
import OwnerVehicle from './OwnerVehicle';
import Dueno from './Dueno';
import Seguro from './Seguro';

export default class Vehiculo extends BaseModel {

  @column({ isPrimary: true })
  public id: number;

  @column()
  public tipo_vehiculo: string;

  @column()
  public capacidad_peso: number;

  @column()
  public capacidad_volumen: number;

  @column()
  public estado: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Seguro, {
    foreignKey: 'vehiculo_id'
  })
  public seguros: HasMany<typeof Seguro>;

  @hasMany(() => VehicleDriver, {
    foreignKey: 'vehiculo_id'
  })
  public vehicledrivers: HasMany<typeof VehicleDriver>;

  @hasManyThrough([() => Conductor, () => VehicleDriver], {
    localKey: 'id',
    foreignKey: 'vehiculo_id',
    throughLocalKey: 'conductor_id',
    throughForeignKey: 'id'
  })
  public conductores: HasManyThrough<typeof Conductor>;

  @hasMany(() => OwnerVehicle, {
    foreignKey: 'vehiculo_id'
  })
  public ownervehicles: HasMany<typeof OwnerVehicle>;

  @hasManyThrough([() => Dueno, () => OwnerVehicle], {
    localKey: 'id',
    foreignKey: 'vehiculo_id',
    throughLocalKey: 'dueno_id',
    throughForeignKey: 'id'
  })
  public duenos: HasManyThrough<typeof Dueno>;
}