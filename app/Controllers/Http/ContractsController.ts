import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // Importa el tipo de contexto para la solicitud HTTP.
import Contract from 'App/Models/Contract' // Importa el modelo 'Contract' que representa los contratos en la base de datos.

export default class ContractsController {

  // Método para obtener un contrato por su ID o listar todos los contratos
  public async find({ request, params }: HttpContextContract) {
    // Si se proporciona un 'id' en los parámetros de la URL
    if (params.id) {
      // Busca el contrato por su ID. Si no lo encuentra, lanzará una excepción.
      let theContract: Contract = await Contract.findOrFail(params.id)
      // Carga la relación 'cuotas' asociada al contrato.
      await theContract.load("cuotas")
      // Devuelve el contrato con las cuotas cargadas.
      return theContract;
    } else {
      // Si no se proporciona un 'id', se verifican los parámetros de paginación en la solicitud.
      const data = request.all()

      // Si se proporcionan 'page' y 'per_page' en los parámetros de la solicitud
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1); // Página actual, por defecto 1.
        const perPage = request.input("per_page", 20); // Elementos por página, por defecto 20.
        // Devuelve una lista de contratos con paginación.
        return await Contract.query().paginate(page, perPage)
      // Si no se proporciona paginación, devuelve todos los contratos.
      } else {
        return await Contract.query()
      }
    }
  }

  // Método para crear un nuevo contrato
  public async create({ request }: HttpContextContract) {
    // Aquí puedes agregar la validación de datos, por ejemplo: await request.validate(ContractValidator);
    const body = request.body(); // Obtiene los datos de la solicitud.
    // Crea un nuevo contrato en la base de datos con los datos proporcionados.
    const theContract: Contract = await Contract.create(body);
    // Devuelve el contrato recién creado.
    return theContract;
  }

  // Método para actualizar la información de un contrato
  public async update({ params, request }: HttpContextContract) {
    // Busca el contrato por su ID. Si no se encuentra, lanzará una excepción.
    const theContract: Contract = await Contract.findOrFail(params.id);
    const body = request.body(); // Obtiene los nuevos datos enviados en la solicitud.

    // Actualiza los campos del contrato con los nuevos valores proporcionados.
    theContract.fecha_inicio = body.fechaInicio;
    theContract.fecha_fin = body.fechaFin;
    theContract.estado = body.estado;
    theContract.detalles_servicio = body.detallesServicio;

    // Guarda los cambios en la base de datos.
    return await theContract.save();
  }

  // Método para eliminar un contrato por su ID
  public async delete({ params, response }: HttpContextContract) {
    // Busca el contrato por su ID. Si no se encuentra, lanzará una excepción.
    const theContract: Contract = await Contract.findOrFail(params.id);

    // Establece el código de estado HTTP 204 (Sin contenido), que indica que la eliminación fue exitosa pero no hay contenido en la respuesta.
    response.status(204);

    // Elimina el contrato de la base de datos y devuelve el resultado de la operación.
    return await theContract.delete();
  }
}
