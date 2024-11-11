import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehiculo from 'App/Models/Vehiculo';

export default class VehiculosController {

    public async find({ request, params }: HttpContextContract) {
        // Listar un elemento por Id
        if (params.id) {
            let theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id)
            await theVehiculo.load("vehicledrivers", Query=>{
                Query.preload("conductor")  // Precarga la relación 'conductor'
            })
            await theVehiculo.load("ownervehicles", Query=>{
                Query.preload("dueno") // Precarga la relación 'dueno'
            })
            return theVehiculo;
        } else {
            const data = request.all()
            // Listar elementos por pagina
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);     // Obtiene el número de página
                const perPage = request.input("per_page", 20);  // Obtiene el número de resultados por página
                return await Vehiculo.query().paginate(page, perPage)
            // Listar todo    
            } else {
                return await Vehiculo.query()
            }
        }
    }

    // Create
    public async create({ request }: HttpContextContract) {
        //await request.validate(VehiculoValidator);
        const body = request.body();  // Obtiene los datos del cuerpo de la solicitud
        const theVehiculo: Vehiculo = await Vehiculo.create(body); // Crea el nuevo vehículo
        return theVehiculo;
    }

    // Update
    public async update({ params, request }: HttpContextContract) {
        // Buscar el objeto a actualizar
        const theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id);
        const body = request.body();  // Obtiene los datos del cuerpo de la solicitud
        // Actualiza los campos del vehículo con los nuevos valores
        theVehiculo.tipo_vehiculo = body.tipo_vehiculo;
        theVehiculo.capacidad_peso = body.capacidad_peso;
        theVehiculo.capacidad_volumen = body.capacidad_volumen;
        theVehiculo.estado = body.estado;

        // Guarda los cambios en la base de datos
        return await theVehiculo.save();
    }

    // Delete
    public async delete({ params, response }: HttpContextContract) {
        // Buscar el objeto a eliminar 
        const theVehiculo: Vehiculo = await Vehiculo.findOrFail(params.id);
        await theVehiculo.delete();  // Elimina el vehículo de la base de datos
        response.status(204); // Responde con código 204, indicando que la operación fue exitosa.
        return;
    }
}
