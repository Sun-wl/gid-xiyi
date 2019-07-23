/**
 * Created by evan on 2016/2/24.
 */
if (__DEBUG__) {
  module.exports = require('./configureStore.dev')
} else {
  module.exports = require('./configureStore.prod')
}

