import {injectReducer} from 'store/reducers'

export default (store) => ({
  path: 'ironing',
  childRoutes: [
    IroningQuery(store)
  ]
})

const IroningQuery = (store) => ({
  path: 'query',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const IroningReducer = require('reducers/Ironing').default
      injectReducer(store, {key: 'iron', reducer: IroningReducer})
      const IroningQuery = require('components/Ironing/IroningSelector').default
      next(null, IroningQuery)
    }, 'IroningQuery')
  }
})
