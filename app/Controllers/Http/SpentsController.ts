import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Spent from 'App/Models/Spent';

export default class SpentsController {

  // Método para encontrar un gasto específico o listar todos
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theSpent: Spent = await Spent.findOrFail(params.id);

      await theSpent.load("servicio");
      await theSpent.load("conductor");

      return theSpent;
    } else {
      const data = request.all();

      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Spent.query().paginate(page, perPage);
      } else {
        return await Spent.query();
      }
    }
  }

  // Método para crear un nuevo gasto
  public async create({ request }: HttpContextContract) {
    const body = request.body();

    const theSpent: Spent = await Spent.create(body);

    await theSpent.load("factura");

    return theSpent;
  }

  // Método para actualizar la información de un gasto
  public async update({ params, request }: HttpContextContract) {
    const theSpent: Spent = await Spent.findOrFail(params.id);
    const body = request.body();

    theSpent.description = body.description;
    theSpent.monto = body.monto;
    theSpent.date = body.date;
    theSpent.servicio_id = body.servicio_id;
    theSpent.conductor_id = body.conductor_id;

    return await theSpent.save();
  }

  // Método para eliminar un gasto por su ID
  public async delete({ params, response }: HttpContextContract) {
    const theSpent: Spent = await Spent.findOrFail(params.id);

    await theSpent.delete();

    response.status(204);
    return;
  }
}