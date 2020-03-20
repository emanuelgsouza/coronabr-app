const config = {
  name: 'Corona BR - Acompanhe os casos do COVID-19 no Brasil',
  color: '#011627'
}

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: config.name,
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        name: 'theme-color',
        content: config.color
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  buefy: {
    css: false
  },
  pwa: {
    workbox: {
      skipWaiting: false
    },
    manifest: {
      background_color: config.color,
      short_name: '@coronabr',
      theme_color: config.color,
      name: config.name
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  // load global styles and variables
  styleResources: {
    scss: ['./assets/sass/variables.scss']
  }
}
