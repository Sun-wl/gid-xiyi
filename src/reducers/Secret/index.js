/**
 * Created by evan on 2016/3/2.
 */
import _ from 'lodash'
import createReducer from 'reducers/createReducer'
import {localStorage, CALL_API, currLang, SHOW_BLOCK, BIND_INFO_SUCCESS} from 'common'

export const GOR = 'GET_OPENID_REQUEST'
export const GOS = 'GET_OPENID_SUCCESS'
export const GOF = 'GET_OPENID_FAILURE'
export const OWI = 'OPEN_IN_WEIXIN'
export const PAT = 'PUT_APP_TICKET'

const initialState = {
  "lang": currLang,
  "ticket": undefined,
  "openId": undefined,
  "ticketStatus": "todo",
  "platform": 'wx'
}

export function appTicketSuccess(data) {
  return {type: PAT, payload: data}
}

export function authorizeSuccess(openid,ticket) {
  let response = {}
  if(openid){
    response = {openid:openid}
  }
  if(ticket){
    response = {...response,ticket:ticket}
  }
  return {type: GOS, response}
}


function authorizeAction(data) {
  return {
    [CALL_API]: {
      types: [GOR, GOS, GOF, SHOW_BLOCK],
      headers: {},
      url: `/authorize?code=${data}`,
      method: "get"
    }
  }
}

export function authorize(data) {
  if (!data || data === null || data.length < 10) {
    return {type: OWI}
  } else {
    return (dispatch) => {
      dispatch(authorizeAction(data))
    }
  }
}

//===========================Actions start ==========================

const actionHandlers = {

  [GOR]: (state) => _.merge({}, state, {ticketStatus: 'pending'}),

  [OWI]: (state) => _.merge({}, state, {ticketStatus: 'open_in_weixin'}),
  [PAT]: (state, action) => {
    localStorage.put("openId", action.payload.ticket)
    return _.merge({}, state, {
      ticketStatus: 'done', ...action.payload
    })
  },
  [GOS]: (state, action) => {
    if(action.response.openid){
      localStorage.put("openId", action.response.openid)
    }
    if(action.response.ticket){
      localStorage.put("ticket", action.response.ticket)
    }
    return _.merge({}, state, {
      openId: action.response.openid,
      ticket: action.response.ticket
    })
  },
  [BIND_INFO_SUCCESS]:(state,action) =>{
    if(action.response.ticket){
      localStorage.put("ticket", action.response.ticket)
    }
    return _.merge({}, state, {
      ticket: action.response.ticket
    })
  },
  [GOF]: (state, action) =>  {
    let newState = _.merge({}, state, {ticketStatus: (action.data || {}).refreshUrl})
    window.location.href = newState.ticketStatus
    return newState
  }
}

export default createReducer(initialState, actionHandlers)

//===========================Actions end ==========================
