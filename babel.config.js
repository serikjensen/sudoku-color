const presets = [
  ['@babel/preset-env', {
    modules: 'commonjs'
  }],
  '@babel/preset-react'
]

const plugins = [
  'babel-plugin-styled-components',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-logical-assignment-operators',
  ['@babel/plugin-proposal-optional-chaining', { loose: false }],
  ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
  ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  '@babel/plugin-proposal-do-expressions',
  '@babel/plugin-transform-object-assign',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-transform-react-jsx'
]

module.exports = { presets, plugins }
