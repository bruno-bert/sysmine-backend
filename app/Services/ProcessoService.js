const Processo = use('App/Models/Processo')

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
      message: `List of processes (${data.rows.length}) returned sucessfully`,
      data
    }


  }


  async store(data) {

    const others = {
      numero_ano: `${data.numero}_${data.ano}`,
      prioridade: '1',
      tipo_inclusao: 'M'
    }

    const stored = await Processo.create({
      ...others,
      ...data
    })

    return {
      message: `Processo ${stored.numero_ano} created sucessfully`,
      data: stored
    }

  }


  async update(id, data) {

    const origin = await Processo.findOrFail(id)

    data.numero_ano = `${data.numero}_${data.ano}`

    origin.merge(data)

    await origin.save()

    return {
      message: `Processo ${origin.numero_ano} updated sucessfully`,
      data: origin
    }

  }


  async show(id) {

    const data = await Processo.findOrFail(id)

    return {
      message: `Process ${data.numero_ano} loaded sucessfully`,
      data
    }

  }

  async destroy(id) {

    const data = await Processo.findOrFail(id)

    await data.delete()

    return {
      message: `Process ${data.numero_ano} deleted sucessfully`,
      data
    }

  }



}

module.exports = new ProcessoService()
