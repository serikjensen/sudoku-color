const rules = require('./rules')

module.exports = (config) => {
  config.set({
    files: [
      './test/setup.js',
      { pattern: 'client/**/*.test.js', watched: false }
    ],
    frameworks: ['mocha'],
    reporters: ['mocha'],
    preprocessors: {
      './test/setup.js': ['webpack'],
      'client/**/*.test.js': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'development',
      module: {
        rules
      }
    },
    browsers: ['Chrome'],
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 30000,
    singleRun: false,
    autoWatch: true,
    webpackMiddleware: {
      stats: 'errors-only'
    }
  })
}
