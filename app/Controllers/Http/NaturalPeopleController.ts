import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import NaturalPerson from "App/Models/NaturalPerson";

export default class NaturalPeopleController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(
        params.id
      );
      await theNaturalPerson.load("Company");
      await theNaturalPerson.load("customer");
      return theNaturalPerson;
    } else {
      const data = request.all();
      if ("page" in data && "per_page" in data) {
        const page = request.input("page", 1);
        const perPage = request.input("per_page", 20);
        return await NaturalPerson.query().paginate(page, perPage);
      } else {
        return await NaturalPerson.query();
      }
    }
  }

  public async create({ request }: HttpContextContract) {
    const body = request.body();
    const theNaturalPerson: NaturalPerson = await NaturalPerson.create(body);
    await theNaturalPerson.load("customer");
    return theNaturalPerson;
  }

  public async update({ params, request }: HttpContextContract) {
    const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(
      params.id
    );
    const body = request.body();
    theNaturalPerson.user_id = body.user_id;
    theNaturalPerson.document_type = body.document_type;
    theNaturalPerson.document_number = body.document_number;
    theNaturalPerson.birth_date = body.birth_date;
    theNaturalPerson.company_id = body.company_id;
    theNaturalPerson.customer_id = body.customer_id;
    await theNaturalPerson.load("Company");
    await theNaturalPerson.load("customer");
    return await theNaturalPerson.save();
  }

  public async delete({ params, response }: HttpContextContract) {
    const theNaturalPerson: NaturalPerson = await NaturalPerson.findOrFail(
      params.id
    );
    await theNaturalPerson.delete();
    return response.status(200).json({
      message: "Persona natural eliminada con éxito",
    });
  }
}