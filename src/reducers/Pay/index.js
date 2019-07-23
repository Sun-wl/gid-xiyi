/**
 * Created by evan on 2016/5/3.
 */

import createReducer from 'reducers/createReducer'
import {CALL_API, SHOW_BLOCK} from 'common'
import _ from 'lodash'

/**
 * 支付
 * @type {String}
 */
export const OPR = 'ORDER_PAY_REQUEST'
export const OPS = 'ORDER_PAY_SUCCESS'
export const OPF = 'ORDER_PAY_FAIL'

export const WPR = 'WALLET_PAY_REQUEST'
export const WPS = 'WALLET_PAY_SUCCESS'
export const WPF = 'WALLET_PAY_FAIL'

const initialState = {
  status: 'todo',
  msg: ''
}

//===========================Actions start ==========================
export function toPayAction(data) {
  return (dispatch, getState) => dispatch(
    {
      [CALL_API]: {
        types: [OPR, OPS, OPF, SHOW_BLOCK],
        url: '/order/pay',
        method: "post",
        body: data
      },
      payOrderNo: data.orderNo,
      channel: data.channel
    }
  )
}

export function toWalletPayAction(data) {
  return (dispatch, getState) => dispatch(
    {
      [CALL_API]: {
        types: [WPR, WPS, WPF, SHOW_BLOCK],
        url: '/order/walletPay',
        method: "post",
        body: {...data,appType:3}
      },
      payOrderNo: data.orderNo,
      amount: data.amount
    }
  )
}

export function appPayRequest (orderNo){
  return {
    type:OPR,
    status: 'pending',
    payOrderNo: orderNo
  }
}

export function appPayResult(data) {
  if (data.status === 'success') {
    return {
      type: OPS,
      response: {
        price: data.amount,
      },
      payOrderNo:data.orderNo,
    }
  } else {
    return {
      type: OPF,
      payOrderNo:data.orderNo,
      msg:data.msg
    }
  }

}

//===========================Actions end ==========================

//===========================Reducer  Start ==========================

const actionHandlers = {
  [OPR]: (state, action) => (
    _.merge({}, state, {
      status: 'pending',
      payOrderNo: action.payOrderNo,
      channel: action.channel,
      msg: ''
    })
  ),
  [OPS]: (state, action) => (
    Object.assign({}, state, {
      data: action.response.charge || action.response ,
      amount: action.response.price,
      status: 'success',
      payOrderNo: action.payOrderNo,
      msg: ''
    })
  ),
  [OPF]: (state, action) => {
    return _.merge({}, state, {
      status: 'fail',
      payOrderNo: action.payOrderNo,
      msg: action.error
    })
  },
  [WPR]: (state, action) => (
    _.merge({}, state, {
      walletPayStatus: 'pending',
      amount: action.amount,
      payOrderNo: action.payOrderNo
    })
  ),
  [WPS]: (state, action) => (
    Object.assign({}, state, {
      walletPayStatus: 'success',
    })
  ),
  [WPF]: (state, action) => {
    return _.merge({}, state, {
      walletPayStatus: 'fail'
    })
  }
}
//===========================Reducer End ==========================


export default createReducer(initialState, actionHandlers)

