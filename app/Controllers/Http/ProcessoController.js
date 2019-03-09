'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Processo = use('App/Models/Processo')
const ProcessoService = use('App/Services/ProcessoService')


/**
 * Resourceful controller for interacting with processos
 */
class ProcessoController {
  /**
   * Show a list of all processos.
   * GET processos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    response,
    auth
  }) {


    const data = await ProcessoService.index(auth)

    response.status(200).json(data)
  }


  /**
   * Create/save a new processo.
   * POST processos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request,
    auth,
    response
  }) {

    const data = request.only(['ano', 'numero', 'titular', 'fase_id'])

    const result = await ProcessoService.store({
      ...data,
      auth
    })

    response.status(200).json(result)

  }

  /**
   * Display a single processo.
   * GET processos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params,
    response
  }) {

    const result = await ProcessoService.show(params.id);

    response.status(200).json(result)

  }


  /**
   * Update processo details.
   * PUT or PATCH processos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    params,
    auth,
    request,
    response
  }) {


    const data = request.only(['ano', 'numero', 'titular', 'fase_id'])

    const result = await ProcessoService.update(params.id, {
      ...data,
      auth
    })

    response.status(200).json(result)

  }

  /**
   * Delete a processo with id.
   * DELETE processos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    params,
    response
  }) {

    const result = await ProcessoService.destroy(params.id)
    response.status(200).json(result)

  }
}

module.exports = ProcessoController
