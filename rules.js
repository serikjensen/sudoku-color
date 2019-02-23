module.exports = [
  { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
  { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
  {
    enforce: 'pre',
    test: /\.js?$/,
    exclude: [/node_modules/],
    loader: 'eslint-loader',
    options: {
      failOnWarning: false,
      emitError: false,
      emitWarning: true,
      failOnError: false,
      fix: false,
      quiet: false
    }
  }
]
