
import {SelectRoute,QueryRoute,AddRoute,EditRoute} from './List'
import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'contact',
  getChildRoutes(location, next) {
    require.ensure([], function (require) {
      const addressReducer = require('reducers/Address').default
      require('components/Address/assets/Address.scss').default
      injectReducer(store, { key: 'address', reducer:addressReducer })
      next(null, [
        SelectRoute(store),
        QueryRoute(store),
        AddRoute(store),
        EditRoute(store)
      ])
    },'WxAddress')
  }
})
