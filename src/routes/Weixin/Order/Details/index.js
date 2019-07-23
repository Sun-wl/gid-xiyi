import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'details',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const OrderDetailsView = require('./OrderDetailsView').default
      if(!store.getState().orderDetails){
        const detailsReducer = require('reducers/Order/Details').default
        injectReducer(store, { key: 'orderDetails', reducer:detailsReducer })
      }
      next(null, OrderDetailsView)
    }, 'WxOrderDetailsView')
  }
})
