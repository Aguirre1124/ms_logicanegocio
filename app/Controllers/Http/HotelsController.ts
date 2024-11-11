import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel' // Importa el modelo Hotel para interactuar con la base de datos

export default class HotelsController {
  
  // Método para obtener un hotel por su ID o listar todos los hoteles
  public async find({ params }: HttpContextContract) {
    if (params.id) { // Si se proporciona un ID en los parámetros
      return await Hotel.findOrFail(params.id) // Busca un hotel por su ID; lanza una excepción si no existe
    } else {
      return await Hotel.all() // Si no se proporciona ID, devuelve todos los hoteles
    }
  }

  // Método para crear un nuevo hotel
  public async create({ request }: HttpContextContract) {
    const body = request.body() // Obtiene los datos enviados en la solicitud
    return await Hotel.create(body) // Crea un nuevo hotel con los datos proporcionados
  }

  // Método para actualizar un hotel existente
  public async update({ params, request }: HttpContextContract) {
    const hotel = await Hotel.findOrFail(params.id) // Busca el hotel por su ID
    hotel.merge(request.body()) // Actualiza los campos del hotel con los datos de la solicitud
    return await hotel.save() // Guarda los cambios en la base de datos
  }

  // Método para eliminar un hotel por su ID
  public async delete({ params, response }: HttpContextContract) {
    const hotel = await Hotel.findOrFail(params.id) // Busca el hotel por su ID
    await hotel.delete() // Elimina el hotel de la base de datos
    response.status(204) // Responde con un código de estado HTTP 204 (sin contenido)
  }
}
