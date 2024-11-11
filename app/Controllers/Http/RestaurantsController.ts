import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restaurant from 'App/Models/Restaurant' // Importa el modelo Restaurant para interactuar con la base de datos

export default class RestaurantsController {
  
  // Método para obtener un restaurante por su ID o listar todos los restaurantes
  public async find({ params }: HttpContextContract) {
    if (params.id) { // Si se proporciona un ID en los parámetros
      return await Restaurant.findOrFail(params.id) // Busca un restaurante por su ID; lanza una excepción si no existe
    } else {
      return await Restaurant.all() // Si no se proporciona ID, devuelve todos los restaurantes
    }
  }

  // Método para crear un nuevo restaurante
  public async create({ request }: HttpContextContract) {
    const body = request.body() // Obtiene los datos enviados en la solicitud
    return await Restaurant.create(body) // Crea un nuevo restaurante con los datos proporcionados
  }

  // Método para actualizar un restaurante existente
  public async update({ params, request }: HttpContextContract) {
    const restaurant = await Restaurant.findOrFail(params.id) // Busca el restaurante por su ID
    restaurant.merge(request.body()) // Actualiza los campos del restaurante con los datos de la solicitud
    return await restaurant.save() // Guarda los cambios en la base de datos
  }

  // Método para eliminar un restaurante por su ID
  public async delete({ params, response }: HttpContextContract) {
    const restaurant = await Restaurant.findOrFail(params.id) // Busca el restaurante por su ID
    await restaurant.delete() // Elimina el restaurante de la base de datos
    response.status(204) // Responde con un código de estado HTTP 204 (sin contenido)
  }
}
