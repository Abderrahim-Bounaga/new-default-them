export default {
  // dev: process.env.NODE_ENV = 'production',
  env: {
    environment: process.env.NODE_ENV
  },
  /*
** Nuxt rendering mode
** See https://nuxtjs.org/api/configuration-mode
*/
  mode: 'universal',
  /*
** Nuxt target
** See https://nuxtjs.org/api/configuration-target
*/
  target: 'server',
  /*
** Headers of the page
** See https://nuxtjs.org/api/configuration-head
*/
   server: {
    port: 3000, // par défaut: 3000
    host: '0.0.0.0', // par défaut: localhost,
    // host: 'localhost',
    // host: '127.0.0.1',
    timing: false
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'default',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/mini_framework.css',
    '~/assets/css/icons.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/utils',
    '~/plugins/http',
    '~/plugins/filters.js',
    { src: '~/assets/js/events.js', ssr: false },
    { src: '~/plugins/global.js', ssr: false },
    { src: '~/plugins/events.js', ssr: false },
    { src: '~/plugins/store', ssr: true },
  ],
  serverMiddleware: ['~/server-middleware/json-parse'],
  router: {
    middleware: ['Page_View']
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],
  render: { static: { maxAge: 60 * 60 * 24 * 365 * 1000 } },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],
  sentry: {
    dsn: 'https://97d6c4cdafd84b5e9e5f8ec255eb0f75@logs.storeino.com/9',
    config: {
      debug: true
    },
    clientConfig: {
      dsn: 'https://97d6c4cdafd84b5e9e5f8ec255eb0f75@logs.storeino.com/9'
    }
  },
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS:true
  }
}
