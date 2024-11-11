import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleDriver from 'App/Models/VehicleDriver';

export default class VehicleDriversController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(params.id)
            await theVehicleDriver.load("vehiculo")   // Precarga la relación 'vehiculo'
            await theVehicleDriver.load("conductor") // Precarga la relación 'conductor'
            return theVehicleDriver;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)      // Obtiene el número de página
                const perPage = request.input("per_page", 20)  // Obtiene el número de resultados por página
                return await VehicleDriver.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await VehicleDriver.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        const body = request.body(); // Obtiene los datos del cuerpo de la solicitud
        const theVehicleDriver: VehicleDriver = await VehicleDriver.create(body); // Crea el registro
        return theVehicleDriver;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(params.id);
        const body = request.body();  // Obtiene los datos de la solicitud
        // Actualiza los campos del registro con los nuevos valores
        theVehicleDriver.fecha_asignacion = body.fecha_asignacion;
        theVehicleDriver.fecha_desasignacion = body.fecha_desasignacion;
        theVehicleDriver.vehiculo_id = body.vehiculo_id;
        theVehicleDriver.conductor_id = body.conductor_id;

        // Guarda los cambios en la base de datos
        return await theVehicleDriver.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar
        const theVehicleDriver: VehicleDriver = await VehicleDriver.findOrFail(params.id);
        await theVehicleDriver.delete(); // Elimina el registro
        response.status(204); // Responde con código 204, indicando que la operación fue exitosa.
        return;
    }
}
