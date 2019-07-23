import {mapToToastrMessage} from './utils'
import {ADD_TOASTR, REMOVE_TOASTR, CLEAN_TOASTR,
  HIDE_TIPS,SHOW_TIPS,SHOW_BLOCK,HIDE_BLOCK,SHOW_OVERLAY,HIDE_OVERLAY} from 'common'

export function addToastrAction(toastr) {
  return {
    type: ADD_TOASTR,
    payload: toastr
  }
}

export function clean() {
  return {
    type: CLEAN_TOASTR
  }
}

export function remove(id) {
  return {
    type: REMOVE_TOASTR,
    payload: {
      id
    }
  }
}

// In case the user wanna bind the actions
// we need to use the func 'mapToToastrMessage' here as well.
export function success(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('success', toastr)
  }
}

export function info(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('info', toastr)
  }
}

export function warning(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('warning', toastr)
  }
}

export function error(...toastr) {
  return {
    type: ADD_TOASTR,
    payload: mapToToastrMessage('error', toastr)
  }
}

export function showTips(obj) {
  return {
    type: SHOW_TIPS,
    payload: obj
  }
}

export function hideTips() {
  return {
    type: HIDE_TIPS
  }
}

export function showBlock(obj) {
  return {
    type: SHOW_BLOCK,
    payload: obj
  }
}

export function hideBlock() {
  return {
    type: HIDE_BLOCK
  }
}

export function showOverlay(obj) {
  return {
    type: SHOW_OVERLAY,
    payload: obj
  }
}

export function hideOverlay() {
  return {
    type: HIDE_OVERLAY
  }
}
