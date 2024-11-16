import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Cuota from 'App/Models/Cuota';

export default class CuotasController {

  // Método para obtener una cuota por su ID o listar todas las cuotas
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theCuota = await Cuota.findOrFail(params.id);
      await theCuota.load('factura');
      await theCuota.load("contract");
      return theCuota;
    } else {
      const data = request.all();

      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Cuota.query().preload('factura').paginate(page, perPage);
      } else {
        return await Cuota.query().preload('factura');
      }
    }
  }

  // Método para crear una nueva cuota
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theCuota: Cuota = await Cuota.create(body);
    return theCuota;
  }

  // Método para actualizar la información de una cuota
  public async update({ params, request }: HttpContextContract) {
    const theCuota: Cuota = await Cuota.findOrFail(params.id);
    const body = request.body();

    theCuota.monto = body.monto;
    theCuota.fecha_vencimiento = body.fecha_vencimiento;
    theCuota.estado_pago = body.estado_pago;

    return await theCuota.save();
  }

  // Método para eliminar una cuota por su ID
  public async delete({ params, response }: HttpContextContract) {
    const theCuota: Cuota = await Cuota.findOrFail(params.id);
    await theCuota.load("factura");

    if (theCuota["factura"] == null) {
      await theCuota.delete();
      return response.status(204);
    } else {
      return response.status(400).json({
        alert: "No se puede eliminar la cuota porque tiene una factura asignada"
      });
    }
  }
}