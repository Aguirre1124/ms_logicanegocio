import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WorkShift from 'App/Models/WorkShift' // Importa el modelo WorkShift para interactuar con la base de datos

export default class WorkShiftsController {
  
  // Método para obtener un turno de trabajo por su ID o listar todos los turnos
  public async find({ params }: HttpContextContract) {
    if (params.id) { // Si se proporciona un ID en los parámetros
      return await WorkShift.findOrFail(params.id) // Busca un turno de trabajo por su ID, lanza una excepción si no existe
    } else {
      return await WorkShift.all() // Si no hay ID, devuelve todos los turnos
    }
  }

  // Método para crear un nuevo turno de trabajo
  public async create({ request }: HttpContextContract) {
    const body = request.body() // Obtiene los datos enviados en la solicitud
    return await WorkShift.create(body) // Crea un nuevo turno de trabajo con los datos proporcionados
  }

  // Método para actualizar un turno de trabajo existente
  public async update({ params, request }: HttpContextContract) {
    const workShift = await WorkShift.findOrFail(params.id) // Busca el turno de trabajo por su ID
    workShift.merge(request.body()) // Actualiza los campos del turno con los nuevos datos
    return await workShift.save() // Guarda los cambios en la base de datos
  }

  // Método para eliminar un turno de trabajo por su ID
  public async delete({ params, response }: HttpContextContract) {
    const workShift = await WorkShift.findOrFail(params.id) // Busca el turno de trabajo por su ID
    await workShift.delete() // Elimina el turno de trabajo de la base de datos
    response.status(204) // Responde con un código de estado HTTP 204 (sin contenido)
  }
}
