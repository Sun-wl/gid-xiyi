import {localStorage, getQueryString} from 'common'
import XiyiRoute from './Xiyi'
import OrderRoute from './Order'
import CouponRoute from './../Coupon'
import ServiceRoute from '../ServiceAbout'
import {appTicketSuccess as pushTicket} from 'reducers/Secret'

const applyTicket = (store, newTicket, oldTicket) => {
  if (newTicket !== oldTicket) {
    store.dispatch({type:'APP_REST_STORE'})
    store.dispatch(
      pushTicket({
        ticket: newTicket,
        "platform": 'app'
      })
    )
  }
}

const checkTicket = (ticket) =>((ticket || '').length === 24)

const apply =(store,next,replace)=>{
  let oldTicket = store.getState().secret.ticket
  let newTicket = getQueryString("ticket")
  if (checkTicket(newTicket)) {
    applyTicket(store, newTicket, oldTicket)
    next()
  } else {
    if (checkTicket(oldTicket)) {
      next()
    } else {
      newTicket = localStorage.get("ticket") || ''
      checkTicket(newTicket) ? applyTicket(store, newTicket,'') : replace('/notLogin')
      next()
    }
  }
}

export default (store) => ({
  path: '/',
  onEnter: (nextState, replace, next) =>  apply(store,next,replace),
  onChange: (prevState, nextState, replace, next) =>  apply(store,next,replace),
  childRoutes: [
    XiyiRoute(store),
    OrderRoute(store),
    CouponRoute(store),
    ServiceRoute(store)
  ]
})
