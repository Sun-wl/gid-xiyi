/**
 * Created by evan on 2016/5/11.
 */
import AddRoute from './Add'
import IroningRoute from './../../Ironing'
import JingxiRoute from './../../Jingxi'
import DaixiRoute from './../../Daixi'
import PartnerRoute from './../IndexView/partner'

export default (store) => ({
  path: 'xiyi',
  getIndexRoute(location, next) {
    require.ensure([], function (require) {
      next(null, {
        component: require('./../IndexView').default,
      })
    },'WxIndexView')
  },
  childRoutes: [
    AddRoute(store),
    IroningRoute(store),
    JingxiRoute(store),
    DaixiRoute(store),
    PartnerRoute(store)
  ]
})
