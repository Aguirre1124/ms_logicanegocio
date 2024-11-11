import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // Importa el tipo de contexto para la solicitud HTTP.
import Factura from 'App/Models/Factura' // Importa el modelo 'Factura' que representa las facturas en la base de datos.

export default class FacturasController {

  // Método para obtener una factura específica por su ID o listar todas las facturas
  public async find({ request, params }: HttpContextContract) {
    // Si se proporciona un 'id' en los parámetros de la URL
    if (params.id) {
      // Busca la factura por su ID. Si no la encuentra, lanzará una excepción.
      let theFactura: Factura = await Factura.findOrFail(params.id)
      
      // Carga la relación 'spent' asociada a la factura
      await theFactura.load('spent')
      
      // Devuelve la factura con la relación 'spent' cargada.
      return theFactura;
    } else {
      const data = request.all() // Obtiene todos los parámetros de la solicitud.

      // Si se proporcionan 'page' y 'per_page' en los parámetros de la solicitud
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1) // Página actual, por defecto 1.
        const perPage = request.input("per_page", 20) // Elementos por página, por defecto 20.
        
        // Devuelve una lista de facturas con paginación.
        return await Factura.query().paginate(page, perPage)
      } else {
        // Si no se proporcionan parámetros de paginación, devuelve todas las facturas.
        return await Factura.query()
      }
    }
  }

  // Método para crear una nueva factura
  public async create({ request }: HttpContextContract) {
    // Aquí puedes agregar la validación de datos, por ejemplo: await request.validate(FacturaValidator);
    const body = request.body(); // Obtiene los datos del cuerpo de la solicitud.
    
    // Crea una nueva factura en la base de datos con los datos proporcionados.
    const theFactura: Factura = await Factura.create(body);
    
    // Carga la relación 'cuota' asociada a la factura.
    await theFactura.load("cuota");
    
    // Devuelve la factura recién creada con la relación 'cuota' cargada.
    return theFactura;
  }

  // Método para actualizar la información de una factura
  public async update({ params, request }: HttpContextContract) {
    // Busca la factura por su ID. Si no la encuentra, lanzará una excepción.
    const theFactura: Factura = await Factura.findOrFail(params.id);
    const body = request.body(); // Obtiene los nuevos datos enviados en la solicitud.

    // Actualiza los campos de la factura con los nuevos valores proporcionados.
    theFactura.fecha_emision = body.fecha_emision;
    theFactura.monto_total = body.monto_total;
    theFactura.estado = body.estado;

    // Guarda los cambios en la base de datos.
    return await theFactura.save();
  }

  // Método para eliminar una factura por su ID
  public async delete({ params, response }: HttpContextContract) {
    // Busca la factura por su ID. Si no la encuentra, lanzará una excepción.
    const theFactura: Factura = await Factura.findOrFail(params.id);
    await theFactura.load("spent"); // Carga la relación 'spent' asociada a la factura.
    
    // Si la factura no tiene ningún gasto asociado (es decir, la relación 'spent' es nula)
    if (theFactura["spent"] == null) {
      // Elimina la factura de la base de datos.
      await theFactura.delete();
      
      // Responde con un código HTTP 204 (sin contenido), indicando que la eliminación fue exitosa.
      return response.status(204);
    } else {
      // Si la factura tiene gastos asociados, no se puede eliminar.
      return response.status(400).json({
        alert: "No se puede eliminar la factura porque tiene un gasto asociado"
      });
    }
  }
}
