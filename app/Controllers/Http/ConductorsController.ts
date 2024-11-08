import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';

export default class ConductorsController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theConductor: Conductor = await Conductor.findOrFail(params.id)
            await theConductor.load("vehicledrivers", Query=>{
                Query.preload("vehiculo")
            })
            await theConductor.load("spents", Query=>{
                Query.preload("servicio")
            })
            return theConductor;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Conductor.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Conductor.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(ConductorValidator);
        const body = request.body();
        const theConductor: Conductor = await Conductor.create(body);
        return theConductor;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theConductor: Conductor = await Conductor.findOrFail(params.id);
        const body = request.body();
        theConductor.nombre = body.nombre;
        theConductor.licencia = body.licencia;
        theConductor.tipo_licencia = body.tipo_licencia;
        theConductor.telefono = body.telefono;
        theConductor.email = body.email;

        // Confirmar el proceso en la base de datos
        return await theConductor.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theConductor: Conductor = await Conductor.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theConductor.delete();
    }
}
