const Fase = use('App/Models/Fase')
const BaseService = use('App/Services/BaseService')
const Intl = use('App/Services/Intl')

class FaseService extends BaseService {
  constructor() {
    super(Fase, {
      modelName: 'fase'
    });
  }
}

module.exports = new FaseService()
