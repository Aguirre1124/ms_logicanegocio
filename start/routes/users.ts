import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    // Listar todos los elementos
    Route.get("/users", "UsersController.find");
    // Listar por id (unico elemento)
    Route.get("/users/:id", "UsersController.find");
    // Crear
    Route.post("/users", "UsersController.create");
    // Actualizar
    Route.put("/users/:id", "UsersController.update");
    // Borrar
    Route.delete("/users/:id", "UersController.delete");
})//.middleware(["security"])