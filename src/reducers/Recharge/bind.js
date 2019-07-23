/**
 * Created by evan on 2016/5/3.
 */

import createReducer from 'reducers/createReducer'
import { CALL_API ,SHOW_BLOCK,BIND_INFO_SUCCESS} from 'common'
import _ from 'lodash'
/**
 * 发送短信
 * @type {string}
 */
export const SSR = 'SEND_SMS_REQUEST'
export const SSS = 'SEND_SMS_SUCCESS'
export const SSF = 'SEND_SMS_FAILURE'

export const BMR = 'BIND_MEMBER_REQUEST'
export const BMS = BIND_INFO_SUCCESS
export const BMF = 'BIND_MEMBER_FAILURE'

const initialState = {
  smsSending:false,
  sendStatus:0,
  bindStatus:0
}

//===========================Actions start ==========================
function sendSmsAction (mobile) {
  return {
    [CALL_API]: {
      types: [SSR, SSS, SSF,SHOW_BLOCK],
      url: "/bind/sendSms",
      method: "post",
      body: {mobileNo:mobile}
    }
  }
}

export function sendSms (mobile) {
  return (dispatch) => dispatch(sendSmsAction(mobile))
}

function bindAction (mobile,validCode) {
  return {
    [CALL_API]: {
      types: [BMR, BMS, BMF,SHOW_BLOCK],
      url: "/bind/member",
      method: "post",
      body: {mobileNo:mobile,validCode:validCode}
    }
  }
}

export function bind (mobile,validCode) {
  return (dispatch) => dispatch(bindAction(mobile,validCode))
}
//===========================Actions end ==========================

//===========================Reducer  Start ==========================
const actionHandlers = {

  [SSR]: (state) =>
    _.merge({}, state, {
      smsSending: true,
      sendStatus: 0 //未发送
    })
  ,

  [SSS]: (state) =>
    _.merge({}, state, {
      smsSending: false,
      sendStatus: 1 //发送成功
    })
  ,

  [SSF]: (state) =>
    _.merge({}, state, {
      smsSending: false,
      sendStatus: -1 //发送失败
    })
  ,

  [BMR]: (state) =>
    _.merge({}, state, {
      bindStatus:0
    }),

  [BMS]: (state) =>
    _.merge({}, state, {
       bindStatus:1
    }),

  [BMF]: (state) =>
    _.merge({}, state, {
       bindStatus:0
    })
}


//===========================Reducer End ==========================


export default createReducer(initialState, actionHandlers)
