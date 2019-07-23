
/**
 * Created by evan on 2016/5/3.
 */

import createReducer from 'reducers/createReducer'
import { CALL_API ,SHOW_BLOCK} from 'common'
import _ from 'lodash'

export const QAR = 'QUERY_ACCOUNT_REQUEST'
export const QAS = 'QUERY_ACCOUNT_SUCCESS'
export const QAF = 'QUERY_ACCOUNT_FAILURE'

export const QRR = 'QUERY_RECHARGELIST_REQUEST'
export const QRS = 'QUERY_RECHARGELIST_SUCCESS'
export const QRF = 'QUERY_RECHARGELIST_FAILURE'

export const CS = 'CHANGE_STATE'


const initialState = {
  list:{
    data:[],
    isLoading:false,
  },
  account:{
     amount:0,
     username:'...',
     isLoading:false
  },
  initState:{
    amount:30000,
    tag:0
  }
}

//===========================Actions start ==========================
function queryAccountAction () {
  return {
    [CALL_API]: {
      types: [QAR, QAS, QAF,SHOW_BLOCK],
      url: "/bind/balance",
      method: "get"
    }
  }
}

export function queryAccount () {
  return (dispatch) => dispatch(queryAccountAction())
}

function queryRechargeListAction () {
  return {
    [CALL_API]: {
      types: [QRR, QRS, QRF,SHOW_BLOCK],
      url: "/recharge/list",
      method: "get"
    }
  }
}

export function queryRechargeList () {
  return (dispatch) => dispatch(queryRechargeListAction())
}

export function changeState (action) {
  return {
    type:CS,
    ...action
  }
}
//===========================Actions end ==========================

//===========================Reducer  Start ==========================
const actionHandlers = {

  [QAR]: (state) =>
    _.merge({}, state, {
      account:{
        isLoading:true
      }
    })
  ,

  [QAS]: (state,action) =>
    _.merge({}, state, {
      account:{
         isLoading:false,
         amount: action.response.available,
         username:action.response.username
      }
    }),

  [QAF]: (state) =>
    _.merge({}, state, {
      account:{
        isLoading:false
      }
    }),

   [QRR]: (state) =>
    _.merge({}, state, {
       list:{isLoading:true}
    }),

  [QRS]: (state,action) =>
    Object.assign({}, state, {
      list:{isLoading:false,  data:action.response}
    }),

  [QRF]: (state) =>
    _.merge({}, state, {
      list:{isLoading:false}
    }),

  [CS]: (state,action) =>{
    return _.merge({}, state, {
      initState:{
        amount:action.amount,
        tag:action.tag
      }
    })
  }
}
//===========================Reducer End ==========================

export default createReducer(initialState, actionHandlers)
