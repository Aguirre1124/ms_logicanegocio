import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Servicio from 'App/Models/Servicio';

export default class ServiciosController {

  // Método para obtener un Servicio específico por su ID o listar todos
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theServicio: Servicio = await Servicio.findOrFail(params.id);

      await theServicio.load("spents", (Query) => {
        Query.preload("conductor");
      });

      return theServicio;
    } else {
      const data = request.all();

      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Servicio.query().paginate(page, perPage);
      } else {
        return await Servicio.query();
      }
    }
  }

  // Método para crear un nuevo Servicio
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theServicio: Servicio = await Servicio.create(body);
    return theServicio;
  }

  // Método para actualizar la información de un Servicio
  public async update({ params, request }: HttpContextContract) {
    const theServicio: Servicio = await Servicio.findOrFail(params.id);
    const body = request.body();

    theServicio.descripcion = body.descripcion;
    theServicio.costo = body.costo;

    return await theServicio.save();
  }

  // Método para eliminar un Servicio por su ID
  public async delete({ params, response }: HttpContextContract) {
    const theServicio: Servicio = await Servicio.findOrFail(params.id);

    await theServicio.delete();

    response.status(204);
    return;
  }
}