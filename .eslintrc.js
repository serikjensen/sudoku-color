module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  plugins: [
    'mocha'
  ],
  parser: 'babel-eslint',
  rules: {
    'arrow-parens': 0,
    'comma-dangle': ['error', 'never'],
    'function-paren-newline': 0,
    "import/no-named-as-default": 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/href-no-hash': 0,
    'max-len': [2, 120, 2],
    'mocha/no-exclusive-tests': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'no-use-before-define': 0,
    'object-curly-newline': ['error', { consistent: true }],
    'prefer-destructuring': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/prefer-stateless-function': 0,
    'semi': ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'spaced-comment': ['error', 'always', { markers: ['*'] }]
  }
}
