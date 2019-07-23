if (__DEBUG__) {
  module.exports = require('./MainLayout.dev.js')
} else {
  module.exports = require('./MainLayout.prod.js')
}

