/**
 * Created by evan on 2016/5/4.
 */
/**
 * Created by evan on 2016/5/3.
 */
import createReducer from 'reducers/createReducer'
import { CALL_API,SHOW_BLOCK } from 'common'
import _ from 'lodash'
export const ODR = 'ORDER_DETAIL_REQUEST'
export const ODS = 'ORDER_DETAIL_SUCCESS'
export const ODF = 'ORDER_DETAIL_FAILURE'

//TODO 默认值
const initialState = {
  data:{
    from: {},
    timelines: [],
    goods: [],
    feePrice: {}
  }
}

//===========================Actions start ==========================

function orderDetailAction (data) {
  return {
    [CALL_API]: {
      types: [ODR, ODS, ODF,SHOW_BLOCK],
      url: `/order/get/${data}`,
      method: "get"
    }
  }
}

export function orderDetail (data,active) {
  return (dispatch, getState) => dispatch(orderDetailAction(data,active))
}

//===========================Actions end ==========================

//===========================Reducer  Start ==========================


const actionHandlers = {
  [ODR]: (state) =>
    _.merge({}, state, {
      pending: true,
      msg: ""
    }),
  [ODS]: (state, action) =>
    Object.assign({}, state, {
      pending: false,
      data:{
        ...action.response
      },
      msg: ""
    }),
  [ODF]: (state, action) => {
    return _.merge({}, state, {
      pending: false,
      msg: action.error
    })
  }
}
//===========================Reducer End ==========================


export default createReducer(initialState, actionHandlers)

