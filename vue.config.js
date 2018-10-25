const path = require('path')
module.exports = {
  chainWebpack: config => {
    config.entry('app')
      .clear()
      .add('./preview/main.js')
      .end()
    config.module.rule('images').use('url-loader').tap(options=>{
      options.fallback='file-loader'
    })
    config.module.rule('media').use('url-loader').tap(options=>{
      options.fallback='file-loader'
    })
    config.module.rule('fonts').use('url-loader').tap(options=>{
      options.fallback='file-loader'
    })
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? '#source-map' : 'none'
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        sourceMap: true,
      },
      css: {
        sourceMap: true,
      },
    },
  },
}
