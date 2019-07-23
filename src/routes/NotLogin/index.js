export default (store) => ({
  path: 'notLogin',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const NotLogin = require('./NotLogin').default
      cb(null, NotLogin)
    }, 'NotLogin')
  }
})
