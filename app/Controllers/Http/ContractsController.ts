import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Contract from 'App/Models/Contract';

export default class ContractsController {

  // Método para obtener un contrato por su ID o listar todos los contratos
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theContract: Contract = await Contract.findOrFail(params.id);
      await theContract.load("cuotas");
      return theContract;
    } else {
      const data = request.all();

      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1);
        const perPage = request.input("per_page", 20);
        return await Contract.query().paginate(page, perPage);
      } else {
        return await Contract.query();
      }
    }
  }

  // Método para crear un nuevo contrato
  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theContract: Contract = await Contract.create(body);
    return theContract;
  }

  // Método para actualizar la información de un contrato
  public async update({ params, request }: HttpContextContract) {
    const theContract: Contract = await Contract.findOrFail(params.id);
    const body = request.body();

    theContract.fecha_inicio = body.fechaInicio;
    theContract.fecha_fin = body.fechaFin;
    theContract.estado = body.estado;
    theContract.detalles_servicio = body.detallesServicio;

    return await theContract.save();
  }

  // Método para eliminar un contrato por su ID
  public async delete({ params, response }: HttpContextContract) {
    const theContract: Contract = await Contract.findOrFail(params.id);

    response.status(204);

    return await theContract.delete();
  }
}