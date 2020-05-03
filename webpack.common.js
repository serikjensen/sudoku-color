const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rules = require('./rules')
const resolve = require('./resolve')

console.log('hello world!')

module.exports = {
  entry: './client/index.js',
  module: {
    rules
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new CopyWebpackPlugin([{
      from: 'static'
    }])
  ],
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  resolve
}
