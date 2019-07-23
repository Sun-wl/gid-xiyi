/**
 * Created by evan on 2016/5/3.
 */

import createReducer from 'reducers/createReducer'
import { CALL_API } from 'common'
import _ from 'lodash'
/**
 * 发送短信
 * @type {string}
 */
export const SSR = 'SEND_SMS_REQUEST'
export const SSS = 'SEND_SMS_SUCCESS'
export const SSF = 'SEND_SMS_FAILURE'




//===========================Actions start ==========================

function sendSmsAction (mobile) {
  return {
    [CALL_API]: {
      types: [SSR, SSS, SSF],
      url: "/order/sendSms",
      method: "post",
      body: {mobile:mobile }
    }
  }
}

export function sendSms (mobile) {
  return (dispatch) => dispatch(sendSmsAction(mobile))
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
}
//===========================Reducer End ==========================

const initialState = {
  smsSending:false,
  sendStatus:0
}

export default createReducer(initialState, actionHandlers)
