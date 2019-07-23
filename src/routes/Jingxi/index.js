import {injectReducer} from 'store/reducers'

export default (store) => ({
  path: 'jingxi',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const JingxiView = require('./JingxiView').default
      const JingxiReducer = require('reducers/Jingxi').default
      injectReducer(store, {key: 'jingxi', reducer: JingxiReducer})
      next(null, JingxiView)
    }, 'JingxiView')
  }
})

