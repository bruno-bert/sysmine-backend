'use strict'

const UserService = use('App/Services/UserService');


class AuthController {

  async register({
    request,
    response
  }) {
    const data = request.only(['username', 'email', 'password'])
    const result = await UserService.create(data)
    return response.status(200).json(result)
  }



  async authenticate({
    request,
    auth,
    response
  }) {
    const {
      email,
      password
    } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = AuthController
