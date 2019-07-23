import {createReducer, guid}  from './utils.js'
import config from './config'
import {
  ADD_TOASTR, REMOVE_TOASTR, CLEAN_TOASTR,
  HIDE_TIPS, SHOW_TIPS, SHOW_BLOCK, HIDE_BLOCK, TOASTR_CLEAN_ALL,
  SHOW_OVERLAY,HIDE_OVERLAY
} from 'common'

const initialState = {
  toastrs: [],
  tips: {
    show: false,
    options: null
  },
  block: {
    show: false,
    icon: true,
    options: null
  },
  overlay:{
    show: false
  }
}

export default createReducer(initialState, {
  [TOASTR_CLEAN_ALL]: (state)=> initialState,

  [ADD_TOASTR]: (state, payload) => {
    const newToastr = {
      id: guid(),
      type: payload.type,
      title: payload.title,
      message: payload.message,
      options: payload.options
    }

    if (!config.newestOnTop) {
      return {
        ...state,
        toastrs: [
          //...state.toastrs,
          newToastr
        ]
      }
    }
    return {
      ...state,
      toastrs: [
        newToastr,
        // ...state.toastrs
      ]
    }
  },
  [REMOVE_TOASTR]: (state, payload) => {
    return {
      ...state,
      toastrs: state.toastrs.filter(toastr => toastr.id !== payload.id)
    }
  },
  [CLEAN_TOASTR]: (state) => {
    return {
      ...state,
      toastrs: []
    }
  },
  [SHOW_TIPS]: (state, payload) => {
    return {
      ...state,
      tips: {
        show: true,
        message: payload.message,
        title: (payload.options || {}).title,
        options: payload.options || null
      }
    }
  },
  [HIDE_TIPS]: (state) => {
    return {
      ...state,
      tips: {
        show: false,
        options: null
      }
    }
  },
  [SHOW_BLOCK]: (state, payload) => {
    return {
      ...state,
      block: {
        show: true,
        message: payload.message,
        icon: payload.icon,
        options: payload.options || null
      }
    }
  },
  [HIDE_BLOCK]: (state) => {
    return {
      ...state,
      block: {
        show: false,
        options: null
      }
    }
  },
  [SHOW_OVERLAY]: (state) => {
    return {
      ...state,
      overlay: {
        show: true
      }
    }
  },
  [HIDE_OVERLAY]: (state) => {
    return {
      ...state,
      overlay: {
        show: false
      }
    }
  }
})
