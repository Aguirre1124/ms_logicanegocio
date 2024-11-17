import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrator from 'App/Models/Administrator';

export default class AdministratorsController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theAdministrator: Administrator = await Administrator.findOrFail(params.id)
            return theAdministrator;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Administrator.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Administrator.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(AdministratorValidator);
        const body = request.body();
        const theAdministrator: Administrator = await Administrator.create(body);
        await theAdministrator.load("servicio");
        return theAdministrator;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theAdministrator: Administrator = await Administrator.findOrFail(params.id);
        const body = request.body();
        theAdministrator.servicio_id = body.servicio_id;

        // Confirmar el proceso en la base de datos
        return await theAdministrator.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theAdministrator: Administrator = await Administrator.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theAdministrator.delete();
    }
}
