import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category' // Importa el modelo Category para interactuar con la base de datos

export default class CategoriesController {
  
  // Método para obtener una categoría por su ID o listar todas las categorías
  public async find({ params }: HttpContextContract) {
    if (params.id) { // Si se proporciona un ID en los parámetros
      return await Category.findOrFail(params.id) // Busca una categoría por su ID, lanza una excepción si no existe
    } else {
      return await Category.all() // Si no hay ID, devuelve todas las categorías
    }
  }

  // Método para crear una nueva categoría
  public async create({ request }: HttpContextContract) {
    const body = request.body() // Obtiene los datos enviados en la solicitud
    return await Category.create(body) // Crea una nueva categoría con los datos proporcionados
  }

  // Método para actualizar una categoría existente
  public async update({ params, request }: HttpContextContract) {
    const category = await Category.findOrFail(params.id) // Busca la categoría por su ID
    category.merge(request.body()) // Actualiza los campos de la categoría con los nuevos datos
    return await category.save() // Guarda los cambios en la base de datos
  }

  // Método para eliminar una categoría por su ID
  public async delete({ params, response }: HttpContextContract) {
    const category = await Category.findOrFail(params.id) // Busca la categoría por su ID
    await category.delete() // Elimina la categoría de la base de datos
    response.status(204) // Responde con un código de estado HTTP 204 (sin contenido)
  }
    // Método para listar todas las categorías, con la opción de filtrar por nombre
    public async index({ request }: HttpContextContract) {
        const nameFilter = request.input('name') // Recibe un filtro opcional por nombre
        if (nameFilter) {
          // Si se recibe un filtro, busca categorías que coincidan parcialmente
          return await Category.query().where('name', 'like', `%${nameFilter}%`)
        }
        // Si no se recibe filtro, devuelve todas las categorías
        return await Category.all()
      }
      
      // Método para seleccionar una categoría específica
      public async show({ params }: HttpContextContract) {
        // Busca una categoría específica por ID
        const category = await Category.findOrFail(params.id)
        return category
      }
    }

