/**
 * Created by Administrator on 2016/7/6.
 */
import createReducer from 'reducers/createReducer'
import { CALL_API,SHOW_BLOCK_HIDE_ERROR,BIND_INFO_SUCCESS } from 'common'
import _ from 'lodash'

export const AIR = 'ACCOUNT_INFO_REQUEST'
export const AIS = BIND_INFO_SUCCESS
export const AIF = 'ACCOUNT_INFO_FAILURE'

//TODO 默认值
const initialState = {
  isLoading: false,
  data: {
    isBind:false
  }
}

//===========================Actions start ==========================
/** 账户 **/

function accountAction() {
  return {
    [CALL_API]: {
      types: [AIR, AIS, AIF, SHOW_BLOCK_HIDE_ERROR], //可选值 有 SHOW_BLOCK，SHOW_BLOCK_HIDE_ERROR，HIDE_BLOCK_SHOW_ERROR
      url: '/bind/info',
      method: "get",
    }
  }
}

export function account() {
  return (dispatch, getState) => dispatch(accountAction())
}

//===========================Actions end ==========================

const actionHandlers = {
  [AIR]: (state) => (
    _.merge({}, state, {isLoading:true})
  ),
  [AIS]: (state, action) => {
    return _.merge({}, state, {
      isLoading:false,
      data: {...action.response,isBind:true}
    })
  },
  [AIF]: (state) => {
    return _.merge({}, state, {isLoading:false})
  }
}

export default createReducer(initialState, actionHandlers)
