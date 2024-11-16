import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/workshifts", "WorkshiftsController.find");
    // Listar por id (unico elemento)
    Route.get("/workshifts/:id", "WorkshiftsController.find");
    // Crear
    Route.post("/workshifts", "WorkshiftsController.create");
    // Actualizar
    Route.put("/workshifts/:id", "WorkshiftsController.update");
    // Borrar
    Route.delete("/workshifts/:id", "WorkshiftsController.delete");
})//.middleware(["security"])