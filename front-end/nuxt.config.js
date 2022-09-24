export default {
  // ssr: false,
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
  },
  privateRuntimeConfig: {
    // secret: process.env.SECRET_KEY,
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Rese',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // SCSS file in the project
    // '~/assets/scss/main.scss'
  ],
  // styleResources: {
  //   scss: ['~/assets/scss/*.scss'],
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vee-validate.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // '@nuxtjs/dotenv',
  ],
  // dotenv: {
  //   filename: `.env.${process.env.NODE_ENV}`
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/api/': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      secure: false
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate'],
  },
  auth: {
    redirect: {
      login: '/',
      logout: '/login',
    },
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'http://localhost:8000',
        token: {
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
        // endpoints: {
        //   login: { url: '/api/auth/login', method: 'post', propertyName: 'access_token' },
        // }
      },
    },
  },
}
