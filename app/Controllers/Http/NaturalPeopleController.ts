import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import NaturalPerson from "App/Models/NaturalPerson";
import NaturalPersonValidator from "App/Validators/NaturalPersonValidator";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class NaturalPeopleController {

     // Método para obtener una persona natural por su ID o listar todas las personas naturales
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      // Buscar una persona natural por ID
      const naturalPerson = await NaturalPerson.findOrFail(params.id)
      await naturalPerson.load('Company') // Cargar relación con la compañía
      await naturalPerson.load('customer') // Cargar relación con el cliente
      return naturalPerson
    } else {
      // Si no se proporciona ID, listar todas las personas naturales
      const page = request.input('page', 1)
      const perPage = request.input('per_page', 20)
      return await NaturalPerson.query().paginate(page, perPage)
    }
  }

   // Método para crear una nueva persona natural
   public async create({ request, response }: HttpContextContract) {
     const body = request.body();
    
    // Llamada al microservicio de verificación de usuario
    const userResponse = await axios.get(
      `${Env.get("MS_SECURITY")}/users/${body.user_id}`,
      {
        headers: { Authorization: request.headers().authorization || "" },
      }
    );

    // Verificar si el microservicio no encuentra el usuario
    if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
      return response.notFound({
        error: "No se encontró información de usuario, verifique que el código sea correcto",
      });
    }

     // Validar los datos usando el validador
    const data = await request.validate(NaturalPersonValidator)
 
    // Crear una nueva persona natural en la base de datos
    const naturalPerson = await NaturalPerson.create(data)
    await naturalPerson.load("Company");
    await naturalPerson.load("customer");

    return naturalPerson
  }

  // Método para actualizar una persona natural
  public async update({ params, request }: HttpContextContract) {
    // Buscar la persona natural por ID
    const naturalPerson = await NaturalPerson.findOrFail(params.id)
    // Validar los datos de la solicitud antes de la actualización

    // Validar los datos y obtener el cuerpo de la solicitud
    const body = request.body();
    // Actualizar los campos de la persona natural con los datos enviados en la solicitud
    naturalPerson.user_id = body.user_id;
    naturalPerson.document_type= body.document_type;
    naturalPerson.document_number = body.document_number;
    naturalPerson.birth_date= body.birth_date;
    naturalPerson.company_id = body.company_id;
    naturalPerson.customer_id = body.customer_id;
    
     // Cargar relaciones después de la actualización
    await naturalPerson.load("Company");
    await naturalPerson.load("customer");

    return naturalPerson
  }

   // Método para eliminar una persona natural
   public async delete({ params, response }: HttpContextContract) {
    // Buscar la persona natural por ID
    const naturalPerson = await NaturalPerson.findOrFail(params.id)
    
    // Eliminar la persona natural
    await naturalPerson.delete()

    // Responder con éxito
    return response.status(200).json({
      message: 'Persona natural eliminada con éxito',
    })
  }
}


