import AuthService from '~/services/AuthService.js'
import axios from 'axios'
const Cookie = require('js-cookie');

export const state = () => ({
  user: null,
  
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  }
}

export const actions = {

  async me({ commit }, { config }) {
    console.log('------------- user me');
    const response = await AuthService.me({ config })
    console.log('---', response.data);
    if (response.data.status === 200) {
      Cookie.set('session', user.session.sessionKey)
    } else {
      Cookie.remove('session')
    }
    commit('SET_USER', response.data.user)
  },
  async login({ commit }, { email, password }) {
    const response = await AuthService.login({ email, password })
    if (response.data.status == 200) {
      commit('SET_USER', response.data.user)
      Cookie.set('session', response.data.session.sessionKey)
    } else {
      throw response.data
    }
    console.log('-----data', response.data);
    
  },
  async register({ commit }, form) {
    const response = await AuthService.register(form)
    console.log('---------- register response', response);
    const data = response.data
    if (data.status != 201){
      console.log('nnnn');
      throw data
    }
  },

  async logout({ commit }) {
    const config = {}
    config.sessionId = Cookie.get('session')
    console.log('session----', config);
    const response = await AuthService.logout(config)
    console.log('------', response);
    if (response.data.status === 204) {
      commit('SET_USER', null)
      Cookie.remove('session')
      console.log('logout --------', response.data);
      return response.data
    } else {
      throw response.data
    }
  }
}
