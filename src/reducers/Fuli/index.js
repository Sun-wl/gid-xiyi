
/**
 * Created by evan on 2016/3/2.
 */
import _ from 'lodash'
import createReducer from 'reducers/createReducer'
import {CALL_API} from 'common'

export const PCR = 'PROCT_CODE_REQUEST'
export const PCS = 'PROCT_CODE_SUCCESS'
export const PCF = 'PROCT_CODE_FAILURE'


const initialState = {
  pending : false,
  code:null,
  msg:null
}

export function getProtCode(proType) {
  return {
    [CALL_API]: {
      types: [PCR, PCS, PCF],
      headers: {},
      url: `/order/getProCode?proType=${proType}`,
      method: "get"
    },
    proType:proType
  }
}


//===========================Actions start ==========================

const actionHandlers = {

  [PCR]: (state, action) => (
    _.merge({}, state, {
      pending : true,
      msg:"获取中...",
      proType:action.proType
    })
  ),

  [PCS]: (state, action) => (
    _.merge({}, state, {
      pending : false,
      msg:"获取成功",
      code:action.response.code,
      proType:action.proType
    })
  ),

  [PCF]: (state, action) => (
    _.merge({}, state, {
      pending : false,
      msg:"已经领完",
      proType:action.proType
    })
  )
}

export default createReducer(initialState, actionHandlers)

//===========================Actions end ==========================
