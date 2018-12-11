module.exports = {
  extends: "airbnb",
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parser: 'babel-eslint',
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'max-len': [2, 120, 2],
    'space-before-function-paren': ['error', 'always'],
    'spaced-comment': ['error', 'always', { markers: ['*'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'no-unused-expressions': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'jsx-a11y/href-no-hash': 0,
    'react/prefer-stateless-function': 0,
    'arrow-parens': 0,
    'prefer-destructuring': 0,
    'object-curly-newline': ['error', { consistent: true }]
  }
}