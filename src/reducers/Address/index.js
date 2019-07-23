/**
 * Created by evan on 2016/3/2.
 */
import createReducer from 'reducers/createReducer'
import { CALL_API,SHOW_BLOCK } from 'common'
import _ from 'lodash'

export const ALR = 'ADDRESS_LIST_REQUEST'
export const ALS = 'ADDRESS_LIST_SUCCESS'
export const ALF = 'ADDRESS_LIST_FAILURE'

export const ADR = 'ADDRESS_DELETE_REQUEST'
export const ADS = 'ADDRESS_DELETE_SUCCESS'
export const ADF = 'ADDRESS_DELETE_FAILURE'

export const AGR = 'ADDRESS_GET_REQUEST'
export const AGS = 'ADDRESS_GET_SUCCESS'
export const AGF = 'ADDRESS_GET_FAILURE'

export const AER = 'ADDRESS_EDIT_REQUEST'
export const AES = 'ADDRESS_EDIT_SUCCESS'
export const AEF = 'ADDRESS_EDIT_FAILURE'

export const AS = 'ADDRESS_SELECTED'
export const ASC = 'ADDRESS_SELECTED_CLEAN'

//TODO 默认值
const initialState = {
  isLoading: false,
  data: [],
  selected: {},
  delSuccess: false,
  detailsData:{},
  addOrEditSuccess: false
}

//===========================Actions start ==========================
/** 地址列表 **/

function addressListAction() {
  return {
    [CALL_API]: {
      types: [ALR, ALS, ALF],
      url: `/address/all`,
      method: "get",
    }
  }
}

export function addressList() {
  return (dispatch, getState) => dispatch(addressListAction())
}

/** 地址详细 **/

function addressDetailsAction(id) {
  return {
    [CALL_API]: {
      types: [AGR, AGS, AGF],
      url: `/address/getById/${id}`,
      method: "get",
    }
  }
}

export function addressDetails(id) {
  return (dispatch, getState) => dispatch(addressDetailsAction(id))
}

/** 删除地址 **/

function deleteAddressAction(id) {
  return {
    [CALL_API]: {
      types: [ADR, ADS, ADF,SHOW_BLOCK],
      url: `/address/delete/${id}`,
      body: {'id': id},
      method: "post"
    }
  }
}

export function deleteAddress(id) {
  return (dispatch, getState) => dispatch(deleteAddressAction(id))
}

function saveOrUpdateAddressAction(data){
  return {
    [CALL_API]: {
     types: [AER, AES, AEF,SHOW_BLOCK],
      url: `/address/saveOrEditAddress`,
      body: data,
      method: "post"
    }
  }
}

export function saveOrUpdateAddress(data) {
  return (dispatch, getState) => dispatch(saveOrUpdateAddressAction(data))
}


//===========================Actions end ==========================


export function selectedAddress(address) {
  return {
    type: AS,
    data: address
  }
}

export function selectedAddressClean() {
  return {
    type: ASC
  }
}

const actionHandlers = {
  [ALR]: (state) => (
    _.merge({}, state, {})
  ),
  [ALS]: (state, action) => {

    return Object.assign({}, state, {
      data: action.response
    })
  },
  [ALF]: (state) => {
    return _.merge({}, state, {})
  },
  [ASC]: (state, action) =>Object.assign({}, state, {selected: {}}),

  [AS]: (state, action) => _.merge({}, state, {
    selected: {
      id: action.data.id,
      name: action.data.name,
      city: action.data.city,
      mobile: action.data.mobile,
      details: action.data.details,
      address: action.data.address
    }
  }),
  [ADR]: (state) => (
    _.merge({}, state, {
      delSuccess: false
    })
  ),
  [ADS]: (state) => (
    _.merge({}, state, {
      delSuccess: true
    })
  ),
  [ADF]: (state) => (
    _.merge({}, state, {
      delSuccess: false
    })
  ),
  [AGR]: (state) => (
    _.merge({}, state, {
      isLoading: true
    })
  ),
  [AGS]: (state,action) => {
    return Object.assign({}, state, {
      detailsData: action.response,
      isLoading: false
    })
  },
  [AGF]: (state) => (
    _.merge({}, state, {
      isLoading: false
    })
  ),
  [AER]: (state) => (
    _.merge({}, state, {
      addOrEditSuccess:false
    })
  ),
  [AES]: (state,action) => {
    return Object.assign({}, state, {
       addOrEditSuccess:true
    })
  },
  [AEF]: (state) => (
    _.merge({}, state, {
      addOrEditSuccess:false
    })
  )
}


//===========================Reducer End ==========================
export default createReducer(initialState, actionHandlers)
