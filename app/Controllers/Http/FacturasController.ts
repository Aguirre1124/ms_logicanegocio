import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Factura from 'App/Models/Factura';

export default class FacturasController {

  // Método para obtener una factura específica por su ID o listar todas las facturas
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theFactura: Factura = await Factura.findOrFail(params.id);
      await theFactura.load('spent');
      return theFactura;
    } else {
      const data = request.all();

      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Factura.query().paginate(page, perPage);
      } else {
        return await Factura.query();
      }
    }
  }

  // Método para crear una nueva factura
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theFactura: Factura = await Factura.create(body);
    await theFactura.load("cuota");
    return theFactura;
  }

  // Método para actualizar la información de una factura
  public async update({ params, request }: HttpContextContract) {
    const theFactura: Factura = await Factura.findOrFail(params.id);
    const body = request.body();

    theFactura.fecha_emision = body.fecha_emision;
    theFactura.monto_total = body.monto_total;
    theFactura.estado = body.estado;

    return await theFactura.save();
  }

  // Método para eliminar una factura por su ID
  public async delete({ params, response }: HttpContextContract) {
    const theFactura: Factura = await Factura.findOrFail(params.id);
    await theFactura.load("spent");
    
    if (theFactura["spent"] == null) {
      await theFactura.delete();
      return response.status(204);
    } else {
      return response.status(400).json({
        alert: "No se puede eliminar la factura porque tiene un gasto asociado"
      });
    }
  }
}