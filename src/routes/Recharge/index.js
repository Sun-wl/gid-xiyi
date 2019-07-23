import {injectReducer} from 'store/reducers'

export default (store) => ({
  path: 'recharge',
  getIndexRoute(location, next) {
    require.ensure([], function (require) {
      const rechargeReducer = require('reducers/Recharge').default
      injectReducer(store, { key: 'recharge', reducer:rechargeReducer })
      next(null, {
        component: require('components/Recharge').default
      })
    },'Recharge')
  },
  childRoutes: [
    confirm(store),
    success(store),
    fail(store),
    bind(store)
  ]
})

const confirm = (store) =>  ({
  path: 'confirm',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const confirmReducer = require('reducers/Recharge/confirm').default
      injectReducer(store, { key: 'confirm', reducer:confirmReducer })
      const RechargeConfirm = require('components/Recharge/confirm').default
      next(null, RechargeConfirm)
    }, 'RechargeConfirm')
  }
})

const success = (store) =>   ({
  path: 'success',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const RechargeSuccess = require('components/Recharge/success').default
      next(null, RechargeSuccess)
    }, 'RechargeSuccess')
  }
})

const fail = (store) =>   ({
  path: 'fail',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const RechargeSuccess = require('components/Recharge/fail').default
      next(null, RechargeSuccess)
    }, 'RechargeFail')
  }
})

const bind = (store) =>   ({
  path: 'bind',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const bindReducer = require('reducers/Recharge/bind').default
      injectReducer(store, { key: 'bind', reducer:bindReducer })
      const RechargeBind = require('components/Recharge/bind').default
      next(null, RechargeBind)
    }, 'RechargeBind')
  }
})


