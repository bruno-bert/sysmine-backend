'use strict'

class AppController {

  async index({
    response
  }) {
    response.status(200).json({
      message: "teste"
    })
  }
}

module.exports = AppController
