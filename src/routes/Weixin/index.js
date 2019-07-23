import OrderRoute from './Order'
import {localStorage, getQueryString, sleep} from 'common'
import {injectReducer } from 'store/reducers'
import AddressRoute from './Address'
import CouponRoute from './../Coupon'
import XiyiRoute from './Xiyi'
import RechargeRoute from '../Recharge'
import AccountRoute from './Account'
import ServiceRoute from '../ServiceAbout'
import {authorize,authorizeSuccess} from 'reducers/Secret'

export default (store)  => ({
  path: '/',
  onEnter:function (nextState, replace, next) {
    let secret = (store.getState().secret || {openId:'',ticketStatus:''})
    if((secret.openId||'').length > 12 ){
      next()
    }else if(secret.ticketStatus.indexOf('http') > -1){
      sleep(2000).then(() => window.location.href = secret.ticketStatus)
    }else {
      const code = getQueryString('code')
      const openId = getQueryString('openId') || localStorage.get('openId')
      if(code && code.length > 10){
        store.dispatch(authorize(code))
        next()
      }else if(openId && openId.length > 10){
        if(openId === localStorage.get('openId') ){
          const ticket = localStorage.get('ticket')
          store.dispatch(authorizeSuccess(openId,ticket))
        }else{
          localStorage.remove('ticket')
          store.dispatch(authorizeSuccess(openId))
        }
        next()
      }else{
        replace('/open_in_weixin')
        next()
      }
    }
  },
  childRoutes: [
    CouponRoute(store),
    OrderRoute(store),
    XiyiRoute(store),
    AddressRoute(store),
    RechargeRoute(store),
    AccountRoute(store),
    ServiceRoute(store)
  ]
})




