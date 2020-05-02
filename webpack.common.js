const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rules = require('./rules')

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
  // Error with moment and webpack https://github.com/moment/moment/issues/4505
  // Note: This would not be an issue if tree shaking was working properly. moment
  // shouldn't be getting pulled into the bundle, it is unrelated to bidirectional
  // which is being brought in by @instructure/ui-i18n
  resolve: {
    alias: { moment$: path.resolve(__dirname, 'node_modules/moment/moment.js') }
  }
}
