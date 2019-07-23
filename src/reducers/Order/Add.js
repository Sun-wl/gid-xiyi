/**
 * Created by evan on 2016/5/3.
 */

import createReducer from 'reducers/createReducer'
import {CALL_API, SHOW_BLOCK,SHOW_BLOCK_HIDE_ERROR} from 'common'
import _ from 'lodash'

export const AOR = 'ADD_ORDER_REQUEST';
export const AOS = 'ADD_ORDER_SUCCESS';
export const AOF = 'ADD_ORDER_FAILURE';
export const HT = 'HIDE_TIPS';
export const ASC = 'APP_SELECT_CONTACT';

export const ADDR = 'ADDRESS_DYN_GET_REQUEST'
export const ADDS = 'ADDRESS_DYN_GET_SUCCESS'
export const ADDF = 'ADDRESS_DYN_GET_FAILURE'


const initialState = {
  pending: false,
  commitSuccess: false,
  verifyMobilePass: false,
  msg: "",
  showTips: true
};


//===========================Actions start ==========================

function addOrderAction(data) {
  return {
    [CALL_API]: {
      types: [AOR, AOS, AOF, SHOW_BLOCK],
      url: "/order/add",
      method: "post",
      body: data
    }
  }
}


export function addOrder(data) {
  return (dispatch, getState) => {
    let _data = data
    let selected = []
    let selectedJingxi=[]

    if(getState().iron && getState().iron.selected ){
       selected = getState().iron.selected
    }

    if(selected && selected.length > 0) {
      _data = {...data, iron: _.map(selected, item=>({'num': item.num, 'code': item.code}))}
    }

    if(getState().jingxi && getState().jingxi.selectedJingxi ){
      selectedJingxi = getState().jingxi.selectedJingxi
    }

    if(selectedJingxi && selectedJingxi.length > 0){
      _data = {..._data, jingxi:_.map(selectedJingxi,item=>({num:item.num,code:item.code}))}
    }

    return dispatch(addOrderAction(_data))
  }
}

/***/
function dynDetailsAction(id) {
  return {
    [CALL_API]: {
      types: [ADDR, ADDS, ADDF,SHOW_BLOCK_HIDE_ERROR],
      url: `/address/getById/${id}`,
      method: "get",
    }
  }
}

export function dynDetails(id) {
  return (dispatch, getState) => dispatch(dynDetailsAction(id))
}


export const hideTips = () => {
  return {type: HT}
}

export const selectContact = (data) => {
  return {
    type: ASC,
    payload: data
  }
};

//===========================Actions end ==========================

//===========================Reducer  Start ==========================

const actionHandlers = {

  [HT]: (state) =>
    _.merge({}, state, {showTips: false}),

  [ASC]: (state, action) => {
    if (action.payload && action.payload.id) {
      return _.merge({}, state, {selectedContact: action.payload})
    } else {
      return Object.assign({}, state, {selectedContact: undefined})
    }
  },

  [AOR]: (state) =>
    _.merge({}, state, {
      pending: true,
      commitSuccess: false,
      verifyMobilePass: false
    }),

  [AOS]: (state, action) =>
    _.merge({}, state, {
      pending: false,
      commitSuccess: true,
      // 等于403 代表短信未通过验证
      verifyMobilePass: true,
      result: {
        ...action.response
      }
    }),

  [AOF]: (state, action) =>
    _.merge({}, state, {
      pending: false,
      msg: action.error || '',
      commitSuccess: false,
      // 等于403 代表短信未通过验证
      verifyMobilePass: action.errorCode != 403
    }),
  [ADDR]: (state) => (
    _.merge({}, state, {
      isLoading: true
    })
  ),
  [ADDS]: (state,action) => {
    return Object.assign({}, state, {
      selectedContact: {
        id: action.response.id,
        name: action.response.name,
        city: action.response.city,
        mobile: action.response.mobile,
        details: action.response.details,
        address: action.response.address
      },
      isLoading: false
    })
  },
  [ADDF]: (state) => (
    Object.assign({}, state, {
      isLoading: false,
      selectedContact:undefined
    })
  )
};
//===========================Reducer End ==========================


export default createReducer(initialState, actionHandlers)

