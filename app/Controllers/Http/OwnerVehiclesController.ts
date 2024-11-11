import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // Importa el tipo de contexto para la solicitud HTTP.
import OwnerVehicle from 'App/Models/OwnerVehicle' // Importa el modelo 'OwnerVehicle' que representa las asignaciones de vehículos a propietarios.

export default class OwnerVehiclesController {

  // Método para obtener un OwnerVehicle específico por su ID o listar todos
  public async find({ request, params }: HttpContextContract) {
    // Si se proporciona un 'id' en los parámetros de la URL
    if (params.id) {
      // Busca el registro OwnerVehicle por su ID. Si no lo encuentra, lanzará una excepción.
      let theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id)
      
      // Carga las relaciones asociadas a OwnerVehicle: 'vehiculo' y 'dueno'.
      await theOwnerVehicle.load("vehiculo")
      await theOwnerVehicle.load("dueno")
      
      // Devuelve el OwnerVehicle con sus relaciones precargadas.
      return theOwnerVehicle;
    } else {
      const data = request.all() // Obtiene todos los parámetros de la solicitud.

      // Si se proporcionan 'page' y 'per_page' en los parámetros de la solicitud
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1) // Página actual, por defecto 1.
        const perPage = request.input("per_page", 20) // Elementos por página, por defecto 20.
        
        // Devuelve una lista de OwnerVehicles con paginación.
        return await OwnerVehicle.query().paginate(page, perPage)
      } else {
        // Si no se proporcionan parámetros de paginación, devuelve todos los OwnerVehicles.
        return await OwnerVehicle.query()
      }
    }
  }

  // Método para crear un nuevo OwnerVehicle
  public async create({ request }: HttpContextContract) {
    const body = request.body(); // Obtiene los datos del cuerpo de la solicitud.
    
    // Crea un nuevo OwnerVehicle en la base de datos con los datos proporcionados.
    const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.create(body);
    
    // Devuelve el OwnerVehicle recién creado.
    return theOwnerVehicle;
  }

  // Método para actualizar la información de un OwnerVehicle
  public async update({ params, request }: HttpContextContract) {
    // Busca el OwnerVehicle por su ID. Si no lo encuentra, lanzará una excepción.
    const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
    const body = request.body(); // Obtiene los nuevos datos enviados en la solicitud.

    // Actualiza los campos de OwnerVehicle con los nuevos valores proporcionados.
    theOwnerVehicle.fechaAsignacion = body.fechaAsignacion;
    theOwnerVehicle.fechaDesasignacion = body.fechaDesasignacion;
    theOwnerVehicle.vehiculo_id = body.vehiculo_id;
    theOwnerVehicle.dueno_id = body.dueno_id;

    // Guarda los cambios en la base de datos.
    return await theOwnerVehicle.save();
  }

  // Método para eliminar un OwnerVehicle por su ID
  public async delete({ params, response }: HttpContextContract) {
    // Busca el OwnerVehicle por su ID. Si no lo encuentra, lanzará una excepción.
    const theOwnerVehicle: OwnerVehicle = await OwnerVehicle.findOrFail(params.id);
    
    // Elimina el OwnerVehicle de la base de datos.
    await theOwnerVehicle.delete();
    
    // Responde con un código HTTP 204 (sin contenido), indicando que la eliminación fue exitosa.
    response.status(204);
    return;
  }
}
