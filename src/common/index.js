/**
 * Created by evan on 2016/3/7.
 */
import EventEmitter from 'eventemitter3'

export const CALL_API = Symbol('Gidoor Server Call API')

export const PAGE_SIZE = 5

//export const CITY_LIST = {Shanghai: '上海', Hangzhou: '杭州',Shenzhen: '深圳'}
export const CITY_LIST = {Shanghai: '上海', Hangzhou: '杭州'}

export const ADD_TOASTR = '@Toastr/toastr/ADD'
export const REMOVE_TOASTR = '@Toastr/toastr/REMOVE'
export const CLEAN_TOASTR = '@Toastr/toastr/CLEAN'
export const SHOW_TIPS = '@Toastr/tips/SHOW'
export const HIDE_TIPS = '@Toastr/tips/HIDE'
export const SHOW_BLOCK = '@Toastr/block/SHOW'  // 显示loading 显示ERROR
export const SHOW_BLOCK_HIDE_ERROR = '@Toastr/block/SHOW/hideError' // 显示loading 隐藏ERORR
export const HIDE_BLOCK_SHOW_ERROR = '@Toastr/block/HIDE/showError' // 隐藏loading 显示ERROR
export const HIDE_BLOCK = '@Toastr/block/HIDE'

export const SHOW_OVERLAY = '@Toastr/overlay/SHOW'
export const HIDE_OVERLAY = '@Toastr/overlay/HIDE'

export const TOASTR_CLEAN_ALL = '@Toastr/clean/ALL'

export const BIND_INFO_SUCCESS = '@Secret/BIND_INFO_SUCCESS'

export const DELIVER_TIME =['09:00-12:00','15:00-18:00','18:00-20:00']

const MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

const WEEK_DAYS_ZH = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六", "今天")

const WEEK_DAYS_EN = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today")

const emitter = new EventEmitter()

export const EE = emitter

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const reqQueue = []

export const lang = () => {
  let locale = 'zh'
  if (navigator.language) {
    locale = navigator.language.split('-')[0]
  }
  if (navigator.languages && navigator.languages[0]) {
    locale = navigator.languages[0].split('-')[0]
  }
  if (locale !== 'zh') {
    return 'en'
  } else {
    return locale
  }
}

export const currLang = lang()

export const localStorage = {
  put: (key, value) => {
    window.localStorage.setItem(key, value)
  },
  get: (key) => {
    return window.localStorage.getItem(key)
  },
  remove: (key) => {
    return window.localStorage.removeItem(key)
  },
  clear: () => {
    window.localStorage.clear()
  }
}

export const getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return r[2]
  } else {
    return null
  }
}

export const getQueryJson = (url) => {
  var ret = {}
  url.replace(/(\w+)=(\w+)/ig, function (a, b, c) {
    ret[b] = unescape(c)
  })
  return ret
}

export const formatDetails = (details, locale) => {

  let _details = ''

  if (!details) {
    return ''
  }

  if (typeof details === 'string') {
    return details
  }

  if (locale === 'en') {
    if (details.room && details.room.length > 0) {
      _details = `Room ${details.room}`
    }
    if (details.floor && details.floor.length > 0) {
      if (_details.length > 0) {
        _details = `${_details}, Floor ${details.floor}`
      } else {
        _details = `Floor ${details.floor}`
      }
    }
    if (details.building && details.building.length > 0) {
      if (_details.length > 0) {
        _details = `${_details}, Building ${details.building}`
      } else {
        _details = `Building ${details.building}`
      }
    }
  } else {
    if (details.detail) {
      _details = details.detail
    } else {
      if (details.building && details.building.length > 0) {
        _details = `${details.building} 号`
      }
      if (details.floor && details.floor.length > 0) {
        if (_details.length > 0) {
          _details = `${_details}, ${details.floor} 层`
        } else {
          _details = `${details.floor} 层`
        }
      }
      if (details.room && details.room.length > 0) {
        if (_details.length > 0) {
          _details = `${_details}, ${details.room} 室`
        } else {
          _details = `${details.room} 室`
        }
      }
    }
  }
  return _details
}


export const formatCity = (city, locale) => {
  if (!locale) {
    locale = currLang
  }
  if (locale === 'en') {
    let c = city
    for (let p in CITY_LIST) {
      if (CITY_LIST[p] === city) {
        c = p
        break
      }
    }
    return c
  } else {
    return CITY_LIST[city] ? CITY_LIST[city] : city
  }
}


/**
 *
 * @param locale
 */
// export const localContact = () => {
//   const contact = JSON.parse(localStorage.get('contact1'))
//   const locale = lang()
//   if(!contact){
//     return {city:formatCity('Shanghai',locale)}
//   }
//   contact.addressValue = contact.address
//   contact.address = formatAddress(contact.address,locale)
//   if(locale === 'zh'){
//     if(contact.details){
//       contact.details.detail = formatDetails(contact.details,'zh')
//     }
//   }else{
//     if (typeof contact.details !== 'object') {
//       contact.details =  {}
//     }
//   }
//   contact.city = formatCity(contact.city,locale)
//   return contact
// }

// export const isFunction= (v) => typeof v === 'function'
//
// export const isDefined = (v) => typeof v !== 'undefined'


export const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = true
    }
    return errors
  }, {})

//06/01
export const formatterDateMMdd = (date) => {
  let m = date.getMonth() + 1
  let d = date.getDate()
  return (m < 10 ? `0${m}` : `${m}`) + "/" + (d < 10 ? `0${d}` : `${d}`)
}


export const getWeekName = (date, lang) => {
  if (!date) {
    return ''
  } else {
    let index = (typeof date === 'number' ? date : date.getDay())
    return lang === 'en' ? WEEK_DAYS_EN[index] : WEEK_DAYS_ZH[index]
  }
}

export const getDateMMdd = (date, lang) => {
  if (!date) {
    return ''
  } else {
    let index = date.getMonth() + 1
    return lang === 'en' ? `${MONTH_NAME[index - 1]} ${date.getDate()}`  : `${index}月${date.getDate()}日`
  }
}
