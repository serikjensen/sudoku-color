const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

const rules = require('./rules')

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules
  },
  plugins: [HtmlWebpackPluginConfig],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  }
}
