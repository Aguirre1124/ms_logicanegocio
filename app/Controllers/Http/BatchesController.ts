import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Batch from 'App/Models/Batch' // Importa el modelo Batch para interactuar con la base de datos

export default class BatchesController {
  
  // Método para obtener un lote por su ID o listar todos los lotes
  public async find({ params }: HttpContextContract) {
    if (params.id) { // Si se proporciona un ID en los parámetros
      return await Batch.findOrFail(params.id) // Busca un lote por su ID, lanza una excepción si no existe
    } else {
      return await Batch.all() // Si no hay ID, devuelve todos los lotes
    }
  }

  // Método para crear un nuevo lote
  public async create({ request }: HttpContextContract) {
    const body = request.body() // Obtiene los datos enviados en la solicitud
    return await Batch.create(body) // Crea un nuevo lote con los datos proporcionados
  }

  // Método para actualizar un lote existente
  public async update({ params, request }: HttpContextContract) {
    const batch = await Batch.findOrFail(params.id) // Busca el lote por su ID
    batch.merge(request.body()) // Actualiza los campos del lote con los nuevos datos
    return await batch.save() // Guarda los cambios en la base de datos
  }

  // Método para eliminar un lote por su ID
  public async delete({ params, response }: HttpContextContract) {
    const batch = await Batch.findOrFail(params.id) // Busca el lote por su ID
    await batch.delete() // Elimina el lote de la base de datos
    response.status(204) // Responde con un código de estado HTTP 204 (sin contenido)
  }
}
