const path = require('path')

// Error with moment and webpack https://github.com/moment/moment/issues/4505
// Note: This would not be an issue if tree shaking was working properly. moment
// shouldn't be getting pulled into the bundle, it is unrelated to bidirectional
// which is being brought in by @instructure/ui-i18n
module.exports = {
  alias: { moment$: path.resolve(__dirname, 'node_modules/moment/moment.js') }
}
