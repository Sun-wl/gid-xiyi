import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'list',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const OrderListView = require('./OrderListView').default
      const listReducer = require('reducers/Order/List').default
      injectReducer(store, { key: 'orderList', reducer:listReducer })
      next(null, OrderListView)
    }, 'WxOrderListView')
  }
})
