import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Spent from 'App/Models/Spent' // Importa el modelo Spent para interactuar con la base de datos

export default class SpentsController {

  // Método para encontrar un gasto específico o listar todos
  public async find({ request, params }: HttpContextContract) {
    // Si se proporciona un 'id' en los parámetros de la URL
    if (params.id) {
      // Busca el gasto por su ID. Si no lo encuentra, lanzará una excepción.
      let theSpent: Spent = await Spent.findOrFail(params.id)

      // Carga las relaciones 'servicio' y 'conductor' asociadas con el gasto
      await theSpent.load("servicio")
      await theSpent.load("conductor")

      // Devuelve el gasto con las relaciones precargadas.
      return theSpent;
    } else {
      const data = request.all() // Obtiene todos los parámetros de la solicitud.

      // Si se proporcionan 'page' y 'per_page' en los parámetros de la solicitud
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1) // Página actual, por defecto 1.
        const perPage = request.input("per_page", 20) // Elementos por página, por defecto 20.

        // Devuelve una lista de gastos con paginación.
        return await Spent.query().paginate(page, perPage)
      } else {
        // Si no se proporcionan parámetros de paginación, devuelve todos los gastos.
        return await Spent.query()
      }
    }
  }

  // Método para crear un nuevo gasto
  public async create({ request }: HttpContextContract) {
    const body = request.body(); // Obtiene los datos del cuerpo de la solicitud.
    
    // Crea un nuevo gasto en la base de datos con los datos proporcionados.
    const theSpent: Spent = await Spent.create(body);
    
    // Carga la relación 'factura' asociada con el gasto
    await theSpent.load("factura")
    
    // Devuelve el gasto recién creado con su relación precargada.
    return theSpent;
  }

  // Método para actualizar la información de un gasto
  public async update({ params, request }: HttpContextContract) {
    // Busca el gasto por su ID. Si no lo encuentra, lanzará una excepción.
    const theSpent: Spent = await Spent.findOrFail(params.id);
    const body = request.body(); // Obtiene los nuevos datos enviados en la solicitud.

    // Actualiza los campos del gasto con los nuevos valores proporcionados.
    theSpent.description = body.description;
    theSpent.monto = body.monto;
    theSpent.date = body.date;
    theSpent.servicio_id = body.servicio_id;
    theSpent.conductor_id = body.conductor_id;

    // Guarda los cambios en la base de datos.
    return await theSpent.save();
  }

  // Método para eliminar un gasto por su ID
  public async delete({ params, response }: HttpContextContract) {
    // Busca el gasto por su ID. Si no lo encuentra, lanzará una excepción.
    const theSpent: Spent = await Spent.findOrFail(params.id);

    // Elimina el gasto de la base de datos.
    await theSpent.delete();
    
    // Responde con un código HTTP 204 (sin contenido), indicando que la eliminación fue exitosa.
    response.status(204);
    return;
  }
}
