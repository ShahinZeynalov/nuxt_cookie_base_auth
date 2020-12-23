import VuexORM from '@vuex-orm/core'
import database from '@/database'
const cookieparser = process.server ? require('cookieparser') : undefined




export const state = () => ({
})

export const getter = {
}

export const actions = {
    async nuxtServerInit({ commit, dispatch }, { req }) {
        if(process.server) {
            console.log('------------server');
        } else {
            console.log('------------ client');
        }
        try {
            const parsed = cookieparser.parse(req.headers.cookie)
            console.log('nuxt server init worked in auth', parsed.session);
            const config = {}
            config.sessionKey = parsed.session
            await dispatch('auth/me', { config })
        }
        catch (e) {
            console.log('----------- token is not declared', e);
        }

    },
}

export const plugins = [
  VuexORM.install(database)
]