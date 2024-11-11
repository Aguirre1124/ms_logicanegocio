import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product' // Importa el modelo Product para interactuar con la base de datos

export default class ProductsController {
    
  // Método para listar productos con opciones de paginación
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 20)
    return await Product.query().paginate(page, perPage)
  }
  // Método para obtener un producto por su ID o listar todos los productos
  public async find({ params }: HttpContextContract) {
    if (params.id) { // Si se proporciona un ID en los parámetros
      return await Product.findOrFail(params.id) // Busca un producto por su ID; lanza una excepción si no existe
    } else {
      return await Product.all() // Si no se proporciona ID, devuelve todos los productos
    }
  }

  // Método para crear un nuevo producto
  public async create({ request }: HttpContextContract) {
    const body = request.body() // Obtiene los datos enviados en la solicitud
    return await Product.create(body) // Crea un nuevo producto con los datos proporcionados
  }

  // Método para actualizar un producto existente
  public async update({ params, request }: HttpContextContract) {
    const product = await Product.findOrFail(params.id) // Busca el producto por su ID
    product.merge(request.body()) // Actualiza los campos del producto con los datos de la solicitud
    return await product.save() // Guarda los cambios en la base de datos
  }

  // Método para eliminar un producto por su ID
  public async delete({ params, response }: HttpContextContract) {
    const product = await Product.findOrFail(params.id) // Busca el producto por su ID
    await product.delete() // Elimina el producto de la base de datos
    response.status(204) // Responde con un código de estado HTTP 204 (sin contenido)
  }

  
}
