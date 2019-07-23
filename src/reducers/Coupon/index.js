/**
 * Created by evan on 2016/5/3.
 */

import createReducer from 'reducers/createReducer'
import { CALL_API,CITY_LIST,SHOW_BLOCK } from 'common'
import _ from 'lodash'

export const CFR = 'COUPON_FIND_REQUEST'
export const CFS = 'COUPON_FIND_SUCCESS'
export const CFF = 'COUPON_FIND_FAILURE'

export const CER = 'COUPON_EXCHANGE_REQUEST'
export const CES = 'COUPON_EXCHANGE_SUCCESS'
export const CEF = 'COUPON_EXCHANGE_FAILURE'

export const CS = 'COUPON_SELECTED'
export const CSC = 'COUPON_SELECTED_CLEAN'

const initialState = {
  exchangeStatus: "todo",
  msg: "",
  data: [],
  selected:{id:0,name:''}
}

//===========================Actions start ==========================

/** 订单列表 **/
function couponListAction (city) {
  return {
    [CALL_API]: {
      types: [CFR, CFS, CFF,SHOW_BLOCK],
      url: `/coupon/findCoupon?city=${city||''}`,
      method: "get"
    }
  }
}

export  function selectedCoupons(coupon){
  return {
    type:CS,
    id:coupon.id,
    name:coupon.name
  }
}

export  function selectedCouponsClean(){
  return {
    type:CSC
  }
}

export function couponList (city) {
  return (dispatch, getState) => dispatch(couponListAction(city))
}


function exchangeAction (code) {
  return {
    [CALL_API]: {
      types: [CER, CES, CEF],
      url: "/coupon/exchange?code=" + code,
      method: "get"
    }
  }
}

export function exchangeCoupon (code) {
  return (dispatch) => dispatch(exchangeAction(code))
}
//===========================Actions end ==========================

//===========================Reducer  Start ==========================

const actionHandlers = {
  [CSC]: (state,action) =>Object.assign({}, state, {selected: {}}),
  [CS]: (state,action) => _.merge({}, state, { selected: {id:action.id,name:action.name}}),
  [CFR]: (state) => _.merge({}, state, {isLoading: true }),
  [CFS]: (state, action) => Object.assign({}, state, {data: action.response, isLoading: false}),
  [CFF]: (state) => _.merge({}, state, {isLoading: false}),
  [CER]: (state,action) => _.merge({}, state, { exchangeStatus: 'exchange',  msg: ''}),
  [CES]: (state, action) => _.merge({}, state, {exchangeStatus: 'success' }),
  [CEF]: (state, action) => _.merge({}, state, {exchangeStatus: 'error',msg: action.error})
}
//===========================Reducer End ==========================

export default createReducer(initialState, actionHandlers)
