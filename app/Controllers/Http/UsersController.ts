import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User' // Importa el modelo User para interactuar con la base de datos

export default class UsersController {
  
  // Método para obtener un usuario por su ID o listar todos los usuarios
  public async find({ params }: HttpContextContract) {
    if (params.id) { // Si se proporciona un ID en los parámetros
      return await User.findOrFail(params.id) // Busca un usuario por su ID; lanza una excepción si no existe
    } else {
      return await User.all() // Si no se proporciona ID, devuelve todos los usuarios
    }
  }
  
// Método para listar todos los usuarios con opción de paginación y filtros
public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 20)
    const usersQuery = User.query()
    
    if (request.input('type')) {
      // Filtra usuarios según tipo ("Empresa" o "Persona natural")
      usersQuery.where('type', request.input('type'))
    }
    return await usersQuery.paginate(page, perPage)
  }
  // Método para crear un nuevo usuario
  public async create({ request }: HttpContextContract) {
    const body = request.body() // Obtiene los datos enviados en la solicitud
    return await User.create(body) // Crea un nuevo usuario con los datos proporcionados
  }

  // Método para actualizar un usuario existente
  public async update({ params, request }: HttpContextContract) {
    const user = await User.findOrFail(params.id) // Busca el usuario por su ID
    user.merge(request.body()) // Actualiza los campos del usuario con los datos de la solicitud
    return await user.save() // Guarda los cambios en la base de datos
  }

  // Método para eliminar un usuario por su ID
  public async delete({ params, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id) // Busca el usuario por su ID
    await user.delete() // Elimina el usuario de la base de datos
    response.status(204) // Responde con un código de estado HTTP 204 (sin contenido)
  }
}
