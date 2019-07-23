import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'pay',
  getChildRoutes(location, next) {
    require.ensure([], function (require) {
      const detailsReducer = require('reducers/Order/Details').default
      const payReducer = require('reducers/Pay').default
      const rechargeReducer = require('reducers/Recharge').default

    injectReducer(store, { key: 'recharge', reducer:rechargeReducer })
    injectReducer(store, { key: 'orderDetails', reducer:detailsReducer })
    injectReducer(store, { key: 'charge', reducer:payReducer })
    next(null, [
      Payment(store),
      PayResult(store),
    ])
  },'AppPay')
  }
})


export const Payment = (store) => ({
  path: 'payment/:orderNo',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const Payment = require('./AppPayment').default
      next(null, Payment)
    }, 'AppPayment')
  }
})

export const PayResult = (store) => ({
    path: 'result',
    getComponent (nextState, next) {
      require.ensure([], (require) => {
        const PayResult = require('components/Pay/PayResult').default
        next(null, PayResult)
      }, 'AppPayResult')
    }
})





