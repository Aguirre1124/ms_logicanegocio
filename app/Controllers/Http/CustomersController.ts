import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from 'App/Models/Customer';

export default class CustomersController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theCustomer: Customer = await Customer.findOrFail(params.id)
            await theCustomer.load("contracts")
            await theCustomer.load("products")
            await theCustomer.load("company")
            await theCustomer.load("naturalperson")
            return theCustomer;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Customer.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Customer.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(CustomerValidator);
        const body = request.body();
        const theCustomer: Customer = await Customer.create(body);
        return theCustomer;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theCustomer: Customer = await Customer.findOrFail(params.id);
        const body = request.body();
        theCustomer.name = body.name;
        theCustomer.email = body.email;
        theCustomer.phone = body.phone;
        theCustomer.order_count = body.order_count;

        // Confirmar el proceso en la base de datos
        return await theCustomer.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theCustomer: Customer = await Customer.findOrFail(params.id);
            response.status(204);
            // retorno la accion de borrado
            return await theCustomer.delete();
    }
}