import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dueno from 'App/Models/Dueno';

export default class DuenosController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theDueno: Dueno = await Dueno.findOrFail(params.id)
            await theDueno.load("ownervehicles", Query=>{
                Query.preload("vehiculo")
            })
            return theDueno;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Dueno.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Dueno.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(DuenoValidator);
        const body = request.body();
        const theDueno: Dueno = await Dueno.create(body);
        return theDueno;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theDueno: Dueno = await Dueno.findOrFail(params.id);
        const body = request.body();
        theDueno.nombre = body.nombre;
        theDueno.gmail = body.gmail;

        // Confirmar el proceso en la base de datos
        return await theDueno.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theDueno: Dueno = await Dueno.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theDueno.delete();
    }
}
