if (__MOCK__) {
  module.exports = require('./pingpp.mock.js')
} else {
  module.exports = require('./pingpp.js')
}

