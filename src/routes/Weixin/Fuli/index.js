import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'fuli',
  getChildRoutes(location, next) {
    require.ensure([], function (require) {
      const fuliReducer = require('reducers/Fuli').default
      injectReducer(store, { key: 'fuli', reducer:fuliReducer})
      next(null, [
        FuliIncakeRoute(store),
        FuliYMaiJiuRoute(store),
      ])
    })
  },
  getIndexRoute(location, next) {
    require.ensure([], function (require) {
      next(null, {
        component: require('components/Fuli/FuliView').default
      })
    },'WxFuliView')
  }
})


const FuliIncakeRoute = (store) => ({
  path: 'incake',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const FuliIncakeView = require('components/Fuli/FuliIncakeView').default
      next(null, FuliIncakeView)
    }, 'WxFuliIncakeView')
  }
})

const FuliYMaiJiuRoute = (store) => ({
  path: 'ymaijiu',
  getComponent (nextState, next) {
    require.ensure([], (require) => {
      const FuliYMaiJiuView = require('components/Fuli/FuliYMaiJiuView').default
      next(null, FuliYMaiJiuView)
    }, 'WxFuliYMaiJiuView')
  }
})





