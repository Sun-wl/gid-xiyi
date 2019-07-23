import { injectReducer } from 'store/reducers'
export default (store) => ({
  path: 'pay',
  getChildRoutes(location, next) {
    require.ensure([], function (require) {
      const detailsReducer = require('reducers/Order/Details').default
      const payReducer = require('reducers/Pay').default
      const rechargeReducer = require('reducers/Recharge').default

      injectReducer(store, { key: 'orderDetails', reducer:detailsReducer })
      injectReducer(store, { key: 'charge', reducer:payReducer })
      injectReducer(store, { key: 'recharge', reducer:rechargeReducer })
      next(null, [
        Payment(store),
        PayResult(store),
      ])
    },'WxPay')
  }
})


export const Payment = (store) => ({
  path: 'payment/:orderNo',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Payment = require('./WxPayment').default
      next(null, Payment)
    }, 'WxPayment')
  }
})

export const PayResult = (store) => ({
    path: 'result',
    getComponent (nextState, next) {
      require.ensure([], (require) => {
        const PayResult = require('components/Pay/PayResult').default
        next(null, PayResult)
      }, 'WxPayResult')
    }
})
