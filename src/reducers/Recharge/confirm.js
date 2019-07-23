
/**
 * Created by evan on 2016/5/3.
 */

import createReducer from 'reducers/createReducer'
import { CALL_API ,SHOW_BLOCK} from 'common'
import _ from 'lodash'

export const WPR = 'WECHAT_PAY_REQUEST'
export const WPS = 'WECHAT_PAY_SUCCESS'
export const WPF = 'WECHAT_PAY_FAILURE'


const initialState = {
   status:'todo'
}

//===========================Actions start ==========================
function wechatpayAction (amount) {
  return {
    [CALL_API]: {
      types: [WPR, WPS, WPF,SHOW_BLOCK],
      url: "/recharge",
      method: "post",
      body:{
        "channel":"wx_pub",
        "appType":3,
        "amount":amount,
      }
    }
  }
}

export function wechatpay(amount) {
  return (dispatch) => dispatch(wechatpayAction(amount))
}
//===========================Actions end ==========================

//===========================Reducer  Start ==========================
const actionHandlers = {

  [WPR]: (state) =>
    _.merge({}, state, {
      status:'pending'
    }),

  [WPS]: (state,action) =>
    _.merge({}, state, {
      status:'success',
      charge:action.response.charge
    }),

  [WPF]: (state,action) => _.merge({}, state, {status:'fail',errorMsg:action.error})
}
//===========================Reducer End ==========================

export default createReducer(initialState, actionHandlers)
