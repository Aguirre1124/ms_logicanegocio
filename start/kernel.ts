import Server from '@ioc:Adonis/Core/Server';
import '@adonisjs/bodyparser/build/providers/BodyParserProvider';

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| Aquí se definen los middlewares globales que se ejecutan para todas las
| solicitudes HTTP. Asegúrate de que `BodyParserMiddleware` esté presente.
|
*/
Server.middleware.register([
    'Adonis/Core/BodyParserMiddleware',
  ]);  

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Define middlewares con alias específicos para usarlos en rutas individuales.
| Por ejemplo, puedes agregar middleware de autenticación aquí.
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({});