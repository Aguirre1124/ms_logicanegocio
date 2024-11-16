import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import OwnerVehicle from 'App/Models/OwnerVehicle';

export default class OwnerVehiclesController {

  // Método para obtener un OwnerVehicle específico por su ID o listar todos
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
      await theOwnerVehicle.load("vehiculo");
      await theOwnerVehicle.load("dueno");
      return theOwnerVehicle;
    } else {
      const data = request.all();

      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await OwnerVehicle.query().paginate(page, perPage);
      } else {
        return await OwnerVehicle.query();
      }
    }
  }

  // Método para crear un nuevo OwnerVehicle
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.create(body);
    return theOwnerVehicle;
  }

  // Método para actualizar la información de un OwnerVehicle
  public async update({ params, request }: HttpContextContract) {
    const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
    const body = request.body();

    theOwnerVehicle.fechaAsignacion = body.fechaAsignacion;
    theOwnerVehicle.fechaDesasignacion = body.fechaDesasignacion;
    theOwnerVehicle.vehiculo_id = body.vehiculo_id;
    theOwnerVehicle.dueno_id = body.dueno_id;

    return await theOwnerVehicle.save();
  }

  // Método para eliminar un OwnerVehicle por su ID
  public async delete({ params, response }: HttpContextContract) {
    const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
    await theOwnerVehicle.delete();
    response.status(204);
    return;
  }
}