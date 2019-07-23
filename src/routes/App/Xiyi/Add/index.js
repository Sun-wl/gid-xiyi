/**
 * Created by evan on 2016/2/24.
 */

import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'book',
  childRoutes: [
    daixi(store),
    jingxi(store)
  ]
})

const daixi = (store) =>  ({
  path: 'daixi',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const AddOrderView = require('./AddOrderView').default
      const orderAddReducer = require('reducers/Order/Add').default
      injectReducer(store, { key: 'orderAdd', reducer:orderAddReducer })
      next(null, AddOrderView)
    }, 'AppAddOrderView')
  }
})

const jingxi = (store) =>   ({
  path: 'jingxi',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const AddJingxiOrderView = require('./AddJingxiOrderView').default
      const orderAddReducer = require('reducers/Order/Add').default
      injectReducer(store, { key: 'orderAdd', reducer:orderAddReducer })
      next(null, AddJingxiOrderView)
    }, 'AppAddJingxiOrderView')
  }
})
