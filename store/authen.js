import axios from 'axios'
const Cookie = require('js-cookie');

export const state = () => ({
  authUser: null,
  
})

export const mutations = {
    SET_USER(state, user) {
      state.authUser = user
    }
}

export const actions = {
  async login ({ commit }, { username, password }) {
    return fetch('/api/auth/login', {
      // Send the client cookies to the server
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then((res) => {
      if (res.status === 401) {
        throw new Error('Bad credentials')
      } else {
        return res.json()
      }
    })
    .then((authUser) => {
      commit('SET_USER', authUser)
    })
  },
  async register({commit}, { username, password}) {
    return axios({
      url: '/api/auth/register',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        username,
        password
      })
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data
      } else {
        throw new Error('Bad credentials')
      }
    })
  },
  
  // async login ({ commit }, { username, password }) {
  //   console.log('----', username, password);
  //   return axios({
  //     // Send the client cookies to the server
  //     url: '/api/auth/login', 
  //     credentials: 'same-origin',
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: JSON.stringify({
  //       username,
  //       password
  //     })
  //   })
  //   .then((res) => {
  //     console.log('0---', res);
  //     if (res.status === 401) {
  //       throw new Error('Bad credentials')
  //     } else {
  //       return res
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res);
  //     commit('SET_USER', res.data)
  //   })
  // },
  async logout ({ commit }) {
    return axios({url: '/api/auth/logout', 
      // Send the client cookies to the server
      credentials: 'same-origin',
      method: 'POST'
    })
    .then(() => {
      commit('SET_USER', null)
    })
  }
}
