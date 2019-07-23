import {injectReducer} from 'store/reducers'

export default (store) => ({
  path: 'daixi',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const DaixiView = require('./DaixiView').default
      next(null, DaixiView)
    }, 'DaixiView')
  }
})

