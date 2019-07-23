/**
 * Created by evan on 2016/3/2.
 */
import createReducer from 'reducers/createReducer'
import { CALL_API,SHOW_BLOCK } from 'common'
import _ from 'lodash'

export const ILR = 'IRONING_LIST_REQUEST'
export const ILS = 'IRONING_LIST_SUCCESS'
export const ILF = 'IRONING_LIST_FAILURE'

export const IIO = 'IRONING_ITEM_ONCHANGE'
export const ISC = 'IRONING_SELECTED_CLEAN'

export const ISS = 'IRONING_SELECTED_CONFIRM'


//TODO 默认值
const initialState = {
  isLoading: false,
  data: undefined,
  selected: []
}

//===========================Actions start ==========================
/** 地址列表 **/

function ironingListAction() {
  return {
    [CALL_API]: {
      types: [ILR, ILS, ILF, SHOW_BLOCK],
      url: `/xiyi/iron/list`,
      method: "get",
    }
  }
}

export function ironingList() {
  return (dispatch, getState) => dispatch(ironingListAction())
}

//===========================Actions end ==========================

export function ironItemChange(action) {
  return {
    type: IIO,
    ...action
  }
}

export function ironSelectedClean() {
  return {
    type: ISC
  }
}

export function selectedIronConfirm() {
  return {
    type: ISS
  }
}

const actionHandlers = {
  [ILR]: (state) => (
    _.merge({}, state, {})
  ),
  [ILS]: (state, action) => {

    return Object.assign({}, state, {
      data: action.response
    })
  },
  [ILF]: (state) => {
    return _.merge({}, state, {})
  },
  [IIO]: (state, action) => {
    const item = _.map(state.data[action.itemType].item, (v)=> {
      if (v.code === action.code) {
        const num = (v.num || 0) + action.num
        v.num = num < 0 ? 0 : num
        return v
      } else {
        return v
      }
    })
    return _.merge({}, state, {data: {[action.itemType]: {item: item}}})
  },
  [ISC]: (state) => {
    const {outwear, bottom, accessories,packingBox}  = state.data
    const outwearItem = _.map(outwear.item, (v)=> {
      v.num = 0
      return v
    })
    outwear.item = outwearItem
    const bottomItem = _.map(bottom.item, (v)=> {
      v.num = 0
      return v
    })
    bottom.item = bottomItem
    const accessoriesItem = _.map(accessories.item, (v)=> {
      v.num = 0
      return v
    })
    accessories.item = accessoriesItem

    const packingBoxItem = _.map(packingBox.item, (v)=> {
      v.num = 0
      return v
    })
    packingBox.item = packingBoxItem

    return Object.assign({}, state, {data: {outwear, bottom, accessories,packingBox},selected:[],isLoading:false})
  },
  [ISS]: (state, action) => {
    const {outwear, bottom, accessories,packingBox}  = state.data
    const selected = []
    _.forEach(outwear.item, (v)=> {
      if (v.num > 0) {
        selected.push(v)
      }
    })
    _.forEach(bottom.item, (v)=> {
      if (v.num > 0) {
        selected.push(v)
      }
    })
    _.forEach(accessories.item, (v)=> {
      if (v.num > 0) {
        selected.push(v)
      }
    })
    const totalSpace =
      _.reduce(outwear.item, (sum, v) => sum + v.space * (v.num || 0), 0) +
      _.reduce(bottom.item, (sum, v) => sum + v.space * (v.num || 0), 0) +
      _.reduce(accessories.item, (sum, v) => sum + v.space * (v.num || 0), 0)

    if (selected.length > 0) {
      _.forEach(packingBox.item, (v)=> {
        v.num = Math.ceil(totalSpace / 110.0) || 1
        selected.push(v)
      })
    }

    return Object.assign({}, state, {selected: selected})
  }

}


//===========================Reducer End ==========================
export default createReducer(initialState, actionHandlers)
