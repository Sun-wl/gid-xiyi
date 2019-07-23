if (__MOCK__) {
  module.exports = require('./NativeJsBridge.mock.js')
} else {
  module.exports = require('./NativeJsBridge.js')
}

