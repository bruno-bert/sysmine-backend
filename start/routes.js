"use strict"

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route")

Route.post("/register", "AuthController.register")
Route.post("/authenticate", "AuthController.authenticate")

Route.post("/lang/:id", "UserController.switchLang")

Route.group(() => {

  Route.get("/users", "UserController.index")

  Route.resource('processos', 'ProcessoController')
    .apiOnly()
    .validator(new Map([
      [
        ['processos.store', 'processos.update'],
        ['ProcessoValidator']
      ]
    ]))

  Route.resource('fases', 'FaseController').apiOnly()

}).middleware(['auth', 'locale'])
