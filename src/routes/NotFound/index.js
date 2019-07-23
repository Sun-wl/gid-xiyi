export default (store) => ({
  path: '*',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const NotFound = require('./NotFound').default
      cb(null, NotFound)
    }, 'NotFound')
  }
})
