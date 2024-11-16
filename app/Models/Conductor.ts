import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany, HasManyThrough, hasManyThrough } from '@ioc:Adonis/Lucid/Orm';
import VehicleDriver from './VehicleDriver';
import Vehiculo from './Vehiculo';
import Spent from './Spent';
import Servicio from './Servicio';

export default class Conductor extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nombre: string;

  @column()
  public licencia: string;

  @column()
  public tipo_licencia: string;

  @column()
  public telefono: string;

  @column()
  public email: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => VehicleDriver, { 
    foreignKey: 'conductor_id'
  })
  public vehicledrivers: HasMany<typeof VehicleDriver>;

  @hasManyThrough([() => Vehiculo, () => VehicleDriver], {
    localKey: 'id',
    foreignKey: 'conductor_id',
    throughLocalKey: 'vehiculo_id',
    throughForeignKey: 'id'
  })
  public vehiculos: HasManyThrough<typeof Vehiculo>;

  @hasMany(() => Spent, { 
    foreignKey: 'conductor_id'
  })
  public spents: HasMany<typeof Spent>;

  @hasManyThrough([() => Servicio, () => Spent], {
    localKey: 'id',
    foreignKey: 'conductor_id',
    throughLocalKey: 'servicio_id',
    throughForeignKey: 'id'
  })
  public servicios: HasManyThrough<typeof Servicio>;

}
