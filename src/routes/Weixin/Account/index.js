import {injectReducer} from 'store/reducers'

export default (store) => ({
  path: 'account',
  getIndexRoute(location, next) {
    require.ensure([], function (require) {
      const accountReducer = require('reducers/Account').default
      injectReducer(store, { key: 'account', reducer:accountReducer })
      next(null, {
        component: require('components/Account').default
      })
    },'Account')
  }
})

