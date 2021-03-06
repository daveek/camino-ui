/* eslint-env node */
const path = require('path')
const appConfig = require('./src/app.config')

module.exports = {
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appConfig.title,
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  },
  productionSourceMap: false,
  css: {
    sourceMap: true
    // Enable CSS modules for all CSS/pre-processor files.
    // This option does not affect *.vue files.
    // modules: true
  },
  // Split dependencies into their own bundle.
  // https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: true
  // Configure Webpack's dev server.
  // https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md
  devServer: {
    disableHostCheck: !!process.env.DEV_SERVER_DISABLE_HOST_CHECK || false
    // host: 'camino.local',
    // https: true
    // ...(process.env.API_BASE_URL
    //   ? // Proxy API endpoints to the production base URL.
    //     { proxy: { '/api': { target: process.env.API_BASE_URL } } }
    //   : // Proxy API endpoints a local mock API.
    //     { before: require('./tests/mock-api') })
  }
}
