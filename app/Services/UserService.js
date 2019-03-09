const Intl = use('App/Services/Intl')
const User = use('App/Models/User')
const Env = use('Env')

class UserService {


  async index() {

    const data = await User.all()

    return {
      message: Intl.formatMessage('user.index'),
      data
    }

  }

  async create(data) {

    const lang = Env.get('LANGUAGE', 'en');

    const user = await User.create({
      ...data,
      lang
    })


    return {
      message: Intl.formatMessage('user.create', {
        id: user.username
      }),
      data: user
    }


  }


  async switchLang(id, lang) {

    const user = await User.findOrFail(id)

    user.merge({
      lang
    })

    await user.save();

    Intl.switchLocale(lang);

    return {
      message: Intl.formatMessage('user.switchLang', {
        userid: user.username,
        lang
      }),
      data: user
    }


  }



}

module.exports = new UserService()
