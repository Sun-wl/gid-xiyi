import {injectReducer} from 'store/reducers'

export default (store) => ({
  path: 'coupon',
  childRoutes: [
    CouponSelect(store),
    CouponQuery(store)
  ]
})

const CouponSelect = (store) => ({
  path: 'select',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const CouponReducer = require('reducers/Coupon').default
      const CouponSelect = require('components/Coupon/CouponSelect').default
      injectReducer(store, {key: 'coupon', reducer: CouponReducer})
      next(null, CouponSelect)
    }, 'CouponSelect')
  }
})

const CouponQuery = (store) => ({
  path: 'query',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const CouponReducer = require('reducers/Coupon').default
      injectReducer(store, {key: 'coupon', reducer: CouponReducer})
      const CouponQuery = require('components/Coupon/CouponQuery').default(store.getState().secret.platform)
      next(null, CouponQuery)
    }, 'CouponQuery')
  }
})
