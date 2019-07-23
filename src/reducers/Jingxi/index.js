/**
 * Created by Administrator on 2016/7/6.
 */
import createReducer from 'reducers/createReducer'
import { CALL_API,SHOW_BLOCK } from 'common'
import _ from 'lodash'

export const JLR = 'JINGXI_LIST_REQUEST'
export const JLS = 'JINGXI_LIST_SUCCESS'
export const JLF = 'JINGXI_LIST_FAILURE'

export const IIO = 'JINGXI_ITEM_ONCHANGE'

export const JSC = 'JINGXI_SELECTED_CONFIRM'

export const JSCLEAN = 'JINGXI_SELECTED_CLEAN'

//TODO 默认值
const initialState = {
  isLoading: false,
  data: {
    outwear:{
      code:'',
      item:[]
    },
    bottom:{
      code:'',
      item:[]
    },
    home:{
      code:'',
      item:[]
    },
    accessories:{
      code:'',
      item:[]
    },
    packingBox:{
      item:[],
    }
  },
  selectedJingxi: []
}

//===========================Actions start ==========================
/** 地址列表 **/

function jingxiListAction() {
  return {
    [CALL_API]: {
      types: [JLR, JLS, JLF, SHOW_BLOCK],
      url: `/xiyi/jingxi/list`,
      method: "get",
    }
  }
}

export function jingxiList() {
  return (dispatch, getState) => dispatch(jingxiListAction())
}

export function jingxiItemChange(action) {
  return {
    type: IIO,
    ...action
  }
}

export function jingxiConfirm(action) {
  return {
    type: JSC,
    data:action
  }
}

export function cleanSelected() {
   return {
     type:JSCLEAN
   }
}

//===========================Actions end ==========================

const actionHandlers = {

  [JSCLEAN]:(state) =>{
    const {outwear, bottom, accessories,home, packingBox}  = state.data
    const c = (data) => _.map(data.item, (v)=> {
      v.num = 0
      return v
    })
    return  _.merge({}, state,
      {data:{
          outwear:{item: c(outwear),space:0,jxspace:0},
          bottom:{item:c(bottom),space:0,jxspace:0},
          accessories:{item:c(accessories),space:0,jxspace:0},
          home:{item:c(home),space:0,jxspace:0},
          packingBox:{item: c(packingBox),space:0,jxspace:0}
        }
      })
  },

  [JLR]: (state) => (
    _.merge({}, state, {isLoading:true})
  ),
  [JLS]: (state, action) => {
    return _.merge({}, state, {
      isLoading:false,
      data: action.response
    })
  },
  [JLF]: (state) => {
    return _.merge({}, state, {isLoading:false})
  },
  [IIO]: (state, action) => {

    let itemType = action.itemType

    if(!itemType||itemType == ''){

      const {outwear,bottom,home,accessories}  = state.data

      if(_.find(outwear.item, o=>o.code == action.code)){
        itemType = 'outwear'
      }else if(_.find(bottom.item, o=>o.code == action.code)){
        itemType = 'bottom'
      }else if(_.find(home.item, o=>o.code == action.code)){
        itemType = 'home'
      }else if(_.find(accessories.item, o=>o.code == action.code)){
        itemType = 'accessories'
      }
    }

   _.map(state.data[itemType].item, (v)=> {
      if (v.code === action.code) {
        const num = (v.num || 0) + action.num
        v.num = num < 0 ? 0 : num
        return v
      } else {
        return v
      }
    })

    const totalSpace = (data) => _.reduce(_.filter(data.item, item =>item.num>0),(total,v) => {
      return {
        space:total.space +  (v.space||0) *(v.num||0),
        jxspace:total.jxspace +  (v.jxspace||0)*(v.num||0)
      }
    },{space:0,jxspace:0})


    const otherSpace = (itemType) => {
       return _.map(_.keys(state.data), key=> {
          if(itemType === key){
            const {space,jxspace} = totalSpace(state.data[itemType])
            state.data[key].space = space
            state.data[key].jxspace = jxspace
          }
         return {
           space: state.data[key].space || 0,
           jxspace: state.data[key].jxspace || 0
         }
        })
    }

    const totalSpaceSum =  _.reduce(otherSpace(itemType), (total,v)=> {
      return {
        space:total.space + v.space,
        jxspace:total.jxspace +v.jxspace
      }
    }, {space:0,jxspace:0})

   _.map(state.data.packingBox.item, (v)=> {
        if(v.code === "packingBox" ){
           v.num = Math.ceil(totalSpaceSum.space / (v.space*1.0))
          return v
        }else{
           v.num = Math.ceil(totalSpaceSum.jxspace / (v.space*1.0))
           return v
        }
    })
    return _.merge({}, state, {})
  },
  [JSC]: (state, action) => {
    return Object.assign({}, state, {selectedJingxi: action.data})
  }
}

export default createReducer(initialState, actionHandlers)
