import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contract from 'App/Models/Contract';

export default class ContractsController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theContract: Contract = await Contract.findOrFail(params.id)
            await theContract.load("cuotas")
            return theContract;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Contract.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Contract.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(ContractValidator);
        const body = request.body();
        const theContract: Contract = await Contract.create(body);
        return theContract;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theContract: Contract = await Contract.findOrFail(params.id);
        const body = request.body();
        theContract.fecha_inicio = body.fechaInicio;
        theContract.fecha_fin = body.fechaFin;
        theContract.estado = body.estado;
        theContract.detalles_servicio = body.detallesServicio;
        // Confirmar el proceso en la base de datos
        return await theContract.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theContract: Contract = await Contract.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theContract.delete();
    }
}
