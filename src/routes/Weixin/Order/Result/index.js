export default (store) => ({
  path: 'success',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const OrderSuccess = require('components/Order/OrderSuccess').default
      next(null, OrderSuccess)
    }, 'WxOrderSuccess')
  }
})
