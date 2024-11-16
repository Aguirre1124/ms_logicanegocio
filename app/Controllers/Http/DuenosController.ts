import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Dueno from 'App/Models/Dueno';

export default class DuenosController {

  // Método para obtener un dueño específico por su ID o listar todos los dueños
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theDueno: Dueno = await Dueno.findOrFail(params.id);
      
      await theDueno.load("ownervehicles", (Query) => {
        Query.preload("vehiculo");
      });
      
      return theDueno;
    } else {
      const data = request.all();

      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Dueno.query().preload("ownervehicles").paginate(page, perPage);
      } else {
        return await Dueno.query().preload("ownervehicles");
      }
    }
  }

  // Método para crear un nuevo dueño
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theDueno: Dueno = await Dueno.create(body);
    return theDueno;
  }

  // Método para actualizar la información de un dueño
  public async update({ params, request }: HttpContextContract) {
    const theDueno: Dueno = await Dueno.findOrFail(params.id);
    const body = request.body();

    theDueno.nombre = body.nombre;
    theDueno.gmail = body.gmail;

    return await theDueno.save();
  }

  // Método para eliminar un dueño por su ID
  public async delete({ params, response }: HttpContextContract) {
    const theDueno: Dueno = await Dueno.findOrFail(params.id);
    await theDueno.delete();
    return response.status(204);
  }
}