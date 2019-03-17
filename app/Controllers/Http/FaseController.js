'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const FaseService = use('App/Services/FaseService')

class FaseController extends BaseController {

  constructor() {
    super(FaseService)
  }

  getFieldsFromBody(request) {
    return request.only(['descricao']);
  }

}

module.exports = FaseController
