import {mapToToastrMessage} from './utils.js'
import {EE} from 'common'

function addToToastr(type, array) {
  EE.emit('add/toastr', mapToToastrMessage(type, array))
}

export const toastrEmitter = {
  message: (...args) => addToToastr('message', args),
  info: (...args) => addToToastr('info', args),
  success: (...args) => addToToastr('success', args),
  warning: (...args) => addToToastr('warning', args),
  error: (...args) => addToToastr('error', args),
  clean: () => EE.emit('clean/toastr'),
  tips: (...args) => {
    EE.emit('toastr/tips', {
      message: args[0].toString(),
      options: args[1]
    })
  },
  block: (...args) => {
    EE.emit('toastr/block', {
      message: args[0].toString(),
      options: args[1]
    })
  },
  showOverlay: () => {
    EE.emit('show/overlay')
  },
  hideOverlay: () => {
    EE.emit('clean/overlay')
  }
}
