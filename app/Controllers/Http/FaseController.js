'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Fase = use('App/Models/Fase')

/**
 * Resourceful controller for interacting with fases
 */
class FaseController {
  /**
   * Show a list of all fases.
   * GET fases
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    response
  }) {

    const data = await Fase.all()

    return response.status(200).json({
      message: "List of phases returned sucessfully",
      data
    })

  }


  /**
   * Create/save a new fase.
   * POST fases
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

    const data = request.only(['descricao'])

    const audit = {
      createdBy: auth.user.id,
      updatedBy: auth.user.id,
    }


    const added = await Fase.create({
      ...audit,
      ...data
    })

    response.status(200).json({
      message: "Phase added sucessfully",
      data: added
    })

  }

  /**
   * Display a single fase.
   * GET fases/:id
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

    const data = await Fase.findOrFail(params.id)

    response.status(200).json({
      message: `Phase  ${data.descricao} loaded sucessfully`,
      data
    })


  }


  /**
   * Update fase details.
   * PUT or PATCH fases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    params,
    request,
    response
  }) {}

  /**
   * Delete a fase with id.
   * DELETE fases/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    params,
    request,
    response
  }) {}
}

module.exports = FaseController
