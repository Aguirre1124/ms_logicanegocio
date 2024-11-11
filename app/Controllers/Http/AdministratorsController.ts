import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrator from 'App/Models/Administrator' // Importa el modelo Administrator para interactuar con la base de datos

export default class AdministratorsController {
  
  // Método para obtener un administrador por su ID o listar todos los administradores
  public async find({ params }: HttpContextContract) {
    if (params.id) { // Si se proporciona un ID en los parámetros
      return await Administrator.findOrFail(params.id) // Busca un administrador por su ID, lanza una excepción si no existe
    } else {
      return await Administrator.all() // Si no hay ID, devuelve todos los administradores
    }
  }

  // Método para crear un nuevo administrador
  public async create({ request }: HttpContextContract) {
    const body = request.body() // Obtiene los datos enviados en la solicitud
    return await Administrator.create(body) // Crea un nuevo administrador con los datos proporcionados
  }

  // Método para actualizar un administrador existente
  public async update({ params, request }: HttpContextContract) {
    const administrator = await Administrator.findOrFail(params.id) // Busca el administrador por su ID
    administrator.merge(request.body()) // Actualiza los campos del administrador con los nuevos datos
    return await administrator.save() // Guarda los cambios en la base de datos
  }

  // Método para eliminar un administrador por su ID
  public async delete({ params, response }: HttpContextContract) {
    const administrator = await Administrator.findOrFail(params.id) // Busca el administrador por su ID
    await administrator.delete() // Elimina el administrador de la base de datos
    response.status(204) // Responde con un código de estado HTTP 204 (sin contenido)
  }
}
