const Processo = use('App/Models/Processo')
const Intl = use('App/Services/Intl')

class ProcessoService {

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

    const audit = {
      createdBy: data.auth.user.id,
      updatedBy: data.auth.user.id,
    }


    const others = {
      numero_ano: `${data.numero}_${data.ano}`,
      prioridade: '1',
      tipo_inclusao: 'M'
    }

    const stored = await Processo.create({
      ...others,
      ...data,
      ...audit
    })

    return {
      message: Intl.formatMessage('process.store', {
        id: stored.numero_ano
      }),
      data: stored
    }

  }


  async update(id, data) {

    const origin = await Processo.findOrFail(id)

    data.numero_ano = `${data.numero}_${data.ano}`

    data.updatedBy = data.auth.user.id

    origin.merge(data)

    await origin.save()

    return {
      message: Intl.formatMessage('process.update', {
        id: stored.numero_ano
      }),
      data: origin
    }

  }


  async show(id) {

    const data = await Processo.findOrFail(id)

    return {
      message: Intl.formatMessage('process.show', {
        id: stored.numero_ano
      }),
      data
    }

  }

  async destroy(id) {

    const data = await Processo.findOrFail(id)

    await data.delete()

    return {
      message: Intl.formatMessage('process.destroy', {
        id: stored.numero_ano
      }),
      data
    }

  }



}

module.exports = new ProcessoService()
