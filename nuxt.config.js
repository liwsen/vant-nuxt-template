const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,user-scalable=0'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [{
    src: '~assets/styles/normalize.scss',
    lang: 'scss'
  }, '~assets/styles/vant.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios',
    '~/plugins/vue-vant'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    //prefix: '/root',
    //proxy: true
  },
  // proxy: {
  //   "/root": {
  //     target: "你要代理到的URL",
  //     changeOrigin: true,
  //     secure: false,
  //     pathRewrite: {
  //       "^/root": ""
  //     }
  //   }
  // },
  /*
   ** Build configuration
   */
  build: {
    postcss: [
      require('autoprefixer')({
        browsers: ['Android >= 4.0', 'iOS >= 7']
      }),
      require('postcss-pxtorem')({
        rootValue: 16,
        propList: ['*']
      })
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            formatter: require('eslint-friendly-formatter'),
            // 不符合Eslint规则时只警告(默认运行出错)
            // emitWarning: !config.dev.showEslintErrorsInOverlay
          }
        })
      }
      if (!ctx.isDev && ctx.isClient) {
        const CompressionWebpackPlugin = require('compression-webpack-plugin')
        config.plugins.push(
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' + ['js', 'css'].join('|') +
              ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
          })
        )
        const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
        config.plugins.push(
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
              }
            },
            sourceMap: false,
            parallel: true
          }))
      }
    }
  }
}
