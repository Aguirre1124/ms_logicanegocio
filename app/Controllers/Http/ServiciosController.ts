import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // Importa el tipo de contexto para la solicitud HTTP.
import Servicio from 'App/Models/Servicio' // Importa el modelo 'Servicio', que representa el servicio en la base de datos.

export default class ServiciosController {

  // Método para obtener un Servicio específico por su ID o listar todos
  public async find({ request, params }: HttpContextContract) {
    // Si se proporciona un 'id' en los parámetros de la URL
    if (params.id) {
      // Busca el servicio por su ID. Si no lo encuentra, lanzará una excepción.
      let theServicio: Servicio = await Servicio.findOrFail(params.id)

      // Carga la relación 'spents' asociada al servicio y precarga la relación 'conductor' de cada gasto.
      await theServicio.load("spents", (Query) => {
        Query.preload("conductor")
      })

      // Devuelve el servicio con las relaciones precargadas.
      return theServicio;
    } else {
      const data = request.all() // Obtiene todos los parámetros de la solicitud.

      // Si se proporcionan 'page' y 'per_page' en los parámetros de la solicitud
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1) // Página actual, por defecto 1.
        const perPage = request.input("per_page", 20) // Elementos por página, por defecto 20.

        // Devuelve una lista de Servicios con paginación.
        return await Servicio.query().paginate(page, perPage)
      } else {
        // Si no se proporcionan parámetros de paginación, devuelve todos los Servicios.
        return await Servicio.query()
      }
    }
  }

  // Método para crear un nuevo Servicio
  public async create({ request }: HttpContextContract) {
    const body = request.body(); // Obtiene los datos del cuerpo de la solicitud.
    
    // Crea un nuevo servicio en la base de datos con los datos proporcionados.
    const theServicio: Servicio = await Servicio.create(body);
    
    // Devuelve el servicio recién creado.
    return theServicio;
  }

  // Método para actualizar la información de un Servicio
  public async update({ params, request }: HttpContextContract) {
    // Busca el servicio por su ID. Si no lo encuentra, lanzará una excepción.
    const theServicio: Servicio = await Servicio.findOrFail(params.id);
    const body = request.body(); // Obtiene los nuevos datos enviados en la solicitud.

    // Actualiza los campos de Servicio con los nuevos valores proporcionados.
    theServicio.descripcion = body.descripcion;
    theServicio.costo = body.costo;

    // Guarda los cambios en la base de datos.
    return await theServicio.save();
  }

  // Método para eliminar un Servicio por su ID
  public async delete({ params, response }: HttpContextContract) {
    // Busca el servicio por su ID. Si no lo encuentra, lanzará una excepción.
    const theServicio: Servicio = await Servicio.findOrFail(params.id);
    
    // Elimina el servicio de la base de datos.
    await theServicio.delete();
    
    // Responde con un código HTTP 204 (sin contenido), indicando que la eliminación fue exitosa.
    response.status(204);
    return;
  }
}
