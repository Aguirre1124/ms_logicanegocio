import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Conductor from 'App/Models/Conductor';

export default class ConductorsController {
  
  // Método para obtener un conductor por su ID o listar todos los conductores
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theConductor: Conductor = await Conductor.findOrFail(params.id);
      
      await theConductor.load("vehicledrivers", (Query) => {
        Query.preload("vehiculo");
      });
      
      await theConductor.load("spents", (Query) => {
        Query.preload("servicio");
      });
      
      return theConductor;
    } else {
      const data = request.all();

      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Conductor.query().paginate(page, perPage);
      } else {
        return await Conductor.query();
      }
    }
  }

  // Método para crear un nuevo conductor
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theConductor: Conductor = await Conductor.create(body);
    return theConductor;
  }

  // Método para actualizar la información de un conductor
  public async update({ params, request }: HttpContextContract) {
    const theConductor: Conductor = await Conductor.findOrFail(params.id);
    const body = request.body();

    theConductor.nombre = body.nombre;
    theConductor.licencia = body.licencia;
    theConductor.tipo_licencia = body.tipo_licencia;
    theConductor.telefono = body.telefono;
    theConductor.email = body.email;

    return await theConductor.save();
  }

  // Método para eliminar un conductor por su ID
  public async delete({ params, response }: HttpContextContract) {
    const theConductor: Conductor = await Conductor.findOrFail(params.id);
    
    response.status(204);
    
    return await theConductor.delete();
  }
}