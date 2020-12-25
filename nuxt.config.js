export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'wonder app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  proxy: {
    '/api': 'http://localhost:3000',
    },
  // axios: {
  //   baseURL: "http://localhost:3000",
  //   // credentials: true,
  //   // headers: {
  //   //   'Content-Type': 'application/json',
  //   //   'accept': "application/json"
  //   // },
  
  // },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios', // add this
    '@nuxtjs/auth-next',
  ],
  serverMiddleware: ['~/api/index.js'],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  auth: {
    strategies: {
      local: {
        token: {
          required: false,
          type: false
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
        }
      }
    }
  }
}
