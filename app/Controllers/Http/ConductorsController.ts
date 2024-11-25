import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext' // Importa el tipo para el contexto de la solicitud HTTP.
import Conductor from 'App/Models/Conductor' // Importa el modelo 'Conductor', que representa a los conductores en la base de datos.
import axios from 'axios';
import Env from "@ioc:Adonis/Core/Env";
import { Exception } from '@adonisjs/core/build/standalone';
export default class ConductorsController {
  
  // Método para obtener un conductor por su ID o listar todos los conductores
  public async find({ request, params }: HttpContextContract) {
    // Si se proporciona un 'id' en los parámetros de la URL
    if (params.id) {
      // Encuentra un conductor por su ID. Si no se encuentra, lanzará una excepción.
      let theConductor: Conductor = await Conductor.findOrFail(params.id)
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${theConductor.userId}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );
      await theConductor.load("spents");
      await theConductor.load("shifts");
      await theConductor.load("vehicledrivers");
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        throw new Exception(
          "No se encontró información de usuario en el microservicio de seguridad",
          404
        );
      }

      
       // Cargar las relaciones del conductor
       await theConductor.load("spents", (Query) => {
        Query.preload("servicio"); // Pre-cargar 'servicio' dentro de 'spents'
      });
      await theConductor.load("shifts");
      await theConductor.load("vehicledrivers", (Query) => {
        Query.preload("vehiculo"); // Pre-cargar 'vehiculo' dentro de 'vehicledrivers'
      });
      //Devuelve el conductor con las relaciones cargadas
        return { conductor: theConductor, user: userResponse.data };
    } else {
      // Si no se proporciona un 'id', se verifican los parámetros de paginación en la solicitud.
      const data = request.all()

      // Si se proporcionan 'page' y 'per_page' en los parámetros de la solicitud
      if ("page" in data && "per_page" in data) {
        const page = request.input('page', 1); // Página actual, por defecto 1
        const perPage = request.input("per_page", 20); // Elementos por página, por defecto 20
        // Devuelve la lista de conductores con paginación
        return await Conductor.query().paginate(page, perPage)
      // Si no se proporciona paginación, devuelve todos los conductores
      } else {
        return await Conductor.query()
      }
    }
  }

  // Método para crear un nuevo conductor
  public async create({ request, response }: HttpContextContract) {
    try {
      const body = request.body(); // Obtiene los datos enviados en la solicitud

      // Verificar que el usuario existe en el microservicio de seguridad
      const userResponse = await axios.get(
        `${Env.get("MS_SECURITY")}/users/${body.userId}`,
        {
          headers: { Authorization: request.headers().authorization || "" },
        }
      );

      // Si no se encuentra el usuario, devolver un error 404
      if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
        return response.notFound({
          error: "No se encontró información de usuario, verifique que el código sea correcto",
        });
      }

      // Crear un nuevo conductor en la base de datos
      const theConductor: Conductor = await Conductor.create(body);

      // Devuelve el conductor recién creado
      return theConductor;
    } catch (error) {
      // Manejar errores de validación y otros errores
      if (error.messages) {
        return response.badRequest({ errors: error.messages.errors });
      }
      throw new Exception(
        error.message || "Error al procesar la solicitud",
        error.status || 500
      );
    }
  }

  // Método para actualizar la información de un conductor
  public async update({ params, request }: HttpContextContract) {
    // Busca el conductor por su ID. Si no se encuentra, lanzará una excepción.
    const theConductor: Conductor = await Conductor.findOrFail(params.id);
    const body = request.body(); // Obtiene los nuevos datos enviados en la solicitud

    // Actualiza las propiedades del conductor con los datos proporcionados
    theConductor.nombre = body.nombre;
    theConductor.licencia = body.licencia;
    theConductor.tipo_licencia = body.tipo_licencia;
    theConductor.telefono = body.telefono;
    theConductor.email = body.email;

    // Guarda los cambios en la base de datos
    return await theConductor.save();
  }

  // Método para eliminar un conductor por su ID
  public async delete({ params, response }: HttpContextContract) {
    // Busca el conductor por su ID. Si no se encuentra, lanzará una excepción.
    const theConductor: Conductor = await Conductor.findOrFail(params.id);
    
    response.status(204); // Establece el código de estado HTTP 204 (Sin contenido).
    
    // Elimina el conductor de la base de datos y devuelve el resultado de la operación.
    return await theConductor.delete();
  }
}
