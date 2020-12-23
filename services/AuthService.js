import Session from '~/models/Session';
import User from '~/models/User';
var cookie = require('cookie-signature');
var uuid = require('uuid');



export default {
  async login(form) {
    console.log('---- context data', form);
    const data = {}
    const user = await User.query().where((user) => {
      return user.email === form.email && user.password === form.password
    }).first()
    console.log('----------- user', user);
    
    if (user) {
      var sessionId = cookie.sign(uuid.v4(), process.env.SECRET_KEY)
      var newSession = new Session();
      newSession.sessionKey = sessionId;
      newSession.$save()
      console.log('------- session id', sessionId);
      
      data.user = user.$toJson()
      data.session = newSession.$toJson()
      data.message = 'Welcome back.'
      data.status = 200
    } else {
      data.message = 'Username or password is wrong.'
      data.status = 422
    }
    return {data: data}
  },
  async register(form) {
    const user = await User.query().where('email', form.email).first()
    var data = {}
    if (!user) {
      const new_user = new User(form)
      new_user.$save()
        data.message = 'You have registered successfully'
        data.status = 201
    }
    else {
      data.message = 'User is already exists with this email'
      data.status = 400
    }
    return {data: data}
    
  },
  async me({ config }) {
    console.log('------ headers config ', config);
    const session = await Session.query().where('sessionKey', config.sessionKey).first()
    const data = {}
    if (session) {
      data.session = session.$toJson()
      data.message = 'You get the user data.'
      data.status = 200
    } else{
      data.message = 'You must login to get this information.'
      data.status = 403
    }

    return { data: data }
  },
  async logout(config) {
    console.log('--------------logout config', config);
    const session = await Session.query().where('sessionKey', config.sessionId).first()

    
    const data = {}
    if (session) {
      console.log(session);
      Session.delete(session)
      data.status = 204
      data.message = 'You have logout successfully'
    } else {

    }
    return {data: data}
  }

}