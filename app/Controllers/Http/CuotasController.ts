import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // Importa el tipo de contexto para la solicitud HTTP.
import Cuota from 'App/Models/Cuota' // Importa el modelo 'Cuota' que representa las cuotas en la base de datos.

export default class CuotasController {

  // Método para obtener una cuota por su ID o listar todas las cuotas
  public async find({ request, params }: HttpContextContract) {
    // Si se proporciona un 'id' en los parámetros de la URL
    if (params.id) {
      // Busca la cuota por su ID. Si no la encuentra, lanzará una excepción.
      let theCuota = await Cuota.findOrFail(params.id)
      
      // Carga las relaciones 'factura' y 'contract' asociadas a la cuota
      await theCuota.load('factura')
      await theCuota.load("contract")
      
      // Devuelve la cuota con las relaciones cargadas.
      return theCuota
    } else {
      const data = request.all() // Obtiene todos los parámetros de la solicitud.

      // Si se proporcionan 'page' y 'per_page' en los parámetros de la solicitud
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1) // Página actual, por defecto 1.
        const perPage = request.input("per_page", 20) // Elementos por página, por defecto 20.
        
        // Devuelve una lista de cuotas con paginación y precarga la relación 'factura'.
        return await Cuota.query().preload('factura').paginate(page, perPage)
      } else {
        // Si no se proporcionan parámetros de paginación, devuelve todas las cuotas con la relación 'factura' precargada.
        return await Cuota.query().preload('factura')
      }
    }
  }

  // Método para crear una nueva cuota
  public async create({ request }: HttpContextContract) {
    // Aquí puedes agregar la validación de datos, por ejemplo: await request.validate(CuotaValidator);
    const body = request.body(); // Obtiene los datos del cuerpo de la solicitud.
    
    // Crea una nueva cuota en la base de datos con los datos proporcionados.
    const theCuota: Cuota = await Cuota.create(body);
    
    // Devuelve la cuota recién creada.
    return theCuota;
  }

  // Método para actualizar la información de una cuota
  public async update({ params, request }: HttpContextContract) {
    // Busca la cuota por su ID. Si no se encuentra, lanzará una excepción.
    const theCuota: Cuota = await Cuota.findOrFail(params.id);
    const body = request.body(); // Obtiene los nuevos datos enviados en la solicitud.

    // Actualiza los campos de la cuota con los nuevos valores proporcionados.
    theCuota.monto = body.monto;
    theCuota.fecha_vencimiento = body.fecha_vencimiento;
    theCuota.estado_pago = body.estado_pago;
    
    // Guarda los cambios en la base de datos.
    return await theCuota.save();
  }

  // Método para eliminar una cuota por su ID
  public async delete({ params, response }: HttpContextContract) {
    // Busca la cuota por su ID. Si no se encuentra, lanzará una excepción.
    const theCuota: Cuota = await Cuota.findOrFail(params.id);
    // Carga la relación 'factura' asociada a la cuota.
    await theCuota.load("factura");

    // Si la cuota no tiene una factura asignada
    if (theCuota["factura"] == null) {
      // Elimina la cuota de la base de datos.
      await theCuota.delete();
      // Responde con un código HTTP 204 (sin contenido), indicando que la eliminación fue exitosa.
      return response.status(204);
    } else {
      // Si la cuota tiene una factura asignada, no se puede eliminar y se devuelve un mensaje de error.
      return response.status(400).json({
        alert: "No se puede eliminar la cuota porque tiene una factura asignada"
      });
    }
  }
}
