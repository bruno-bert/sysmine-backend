const Processo = use('App/Models/Processo')
const BaseService = use('App/Services/BaseService')
const Intl = use('App/Services/Intl')

class ProcessoService extends BaseService {

  constructor() {
    super(Processo, {
      modelName: 'process'
    })
  }

  async index() {

    const data = await Processo.query()
      .select('processos.id',
        'processos.numero_ano',
        'processos.titular',
        'fases.descricao as fase')
      .leftOuterJoin('fases', 'fases.id', 'processos.fase_id')
      .fetch()

    return {
      message: Intl.formatMessage('process.index', {
        count: data.rows.length
      }),
      data
    }


  }


  async store(data) {


    const others = {
      numero_ano: `${data.numero}_${data.ano}`,
      prioridade: '1',
      tipo_inclusao: 'M'
    }

    return super.store({
      ...others,
      ...data
    });

    /*
    const stored = await Processo.create()

    return {
      message: Intl.formatMessage('process.store', {
        id: data.numero_ano
      }),
      data: stored
    }*/

  }


  async update(id, data) {

    data.numero_ano = `${data.numero}_${data.ano}`

    return super.update(id, data)

    /*
    const origin = await Processo.findOrFail(id)

    origin.merge(data)

    await origin.save()

    return {
      message: Intl.formatMessage('process.update', {
        id: data.numero_ano
      }),
      data: origin
    }*/

  }


  /*
    async show(id) {

      const data = await Processo.findOrFail(id)

      return {
        message: Intl.formatMessage('process.show', {
          id
        }),
        data
      }

    }

    async destroy(id) {

      const data = await Processo.findOrFail(id)

      await data.delete()

      return {
        message: Intl.formatMessage('process.destroy', {
          id: data.numero_ano
        }),
        data
      }

    }*/



}

module.exports = new ProcessoService()
