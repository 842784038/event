const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // server process.env.NODE_ENV的值就是‘development’
  // build process.env.NODE_ENV的值就是‘production’
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
})
