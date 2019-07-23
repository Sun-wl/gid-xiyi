/**
 * Created by evan on 2016/3/2.
 */
import createReducer from 'reducers/createReducer'
import { CALL_API} from 'common'
import _ from 'lodash'

export const OLR = 'ORDER_LIST_REQUEST'
export const OLS = 'ORDER_LIST_SUCCESS'
export const OLF = 'ORDER_LIST_FAILURE'

//TODO 默认值
const initialState = {
  orders: [],
  pending: true,
  hasData: true
}

//===========================Actions start ==========================
/** 订单列表 **/

function orderListAction (data,active) {
  return {
    [CALL_API]: {
      types: [OLR, OLS, OLF],
      url: `/order/myOrder?${data}`,
      method: "get",
    },
    active:active
  }
}

export function orderList (data,active) {
  return (dispatch, getState) => dispatch(orderListAction(data,active))
}

//===========================Actions end ==========================
const actionHandlers = {
  [OLR]: (state) => (
    _.merge({}, state, {
      pending: true,
      hasData:true
    })
  ),
  [OLS]: (state, action) => {
    if (action.active == 'up'){
      return _.merge({}, state, {
        orders: state.orders.push(...action.response.result) >= 0 ? state.orders : state.orders,
        hasData: (action.response.result || []).length > 0, // action.response.result.length >= PAGE_SIZE
        pending: false
      })
    }
    else {
      return Object.assign({},state, {
        orders: action.response.result,
        pending: false,
        hasData:(action.response.result || []).length > 0 // action.response.result.length >= PAGE_SIZE,
      })
    }
  },
  [OLF]: (state) => {
    return _.merge({}, state, {
      pending: false,
      hasData: false
    })
  }
}

//===========================Reducer End ==========================
export default createReducer(initialState, actionHandlers)
