'use strict'

const ProcessoService = use('App/Services/ProcessoService')
const BaseController = use('App/Controllers/Http/BaseController')

class ProcessoController extends BaseController {

  constructor() {
    super(ProcessoService)
  }

  getFieldsFromBody(request) {
    return request.only(['ano', 'numero', 'titular', 'fase_id']);
  }


}

module.exports = ProcessoController
