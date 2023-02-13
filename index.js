if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/digination-ui.umd.min.js')
} else {
  module.exports = require('./lib/digination-ui.umd.js')
}
