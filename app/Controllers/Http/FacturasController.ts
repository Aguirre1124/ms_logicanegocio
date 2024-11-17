import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Factura from 'App/Models/Factura';

export default class FacturasController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theFactura: Factura = await Factura.findOrFail(params.id)
            return theFactura;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Factura.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Factura.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(FacturaValidator);
        const body = request.body();
        const theFactura: Factura = await Factura.create(body);
        await theFactura.load("cuota");
        return theFactura;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theFactura: Factura = await Factura.findOrFail(params.id);
        const body = request.body();
        theFactura.fecha_emision = body.fecha_emision;
        theFactura.monto_total = body.monto_total;
        theFactura.estado = body.estado;

        // Confirmar el proceso en la base de datos
        return await theFactura.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theFactura: Factura = await Factura.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theFactura.delete();
    }
}
