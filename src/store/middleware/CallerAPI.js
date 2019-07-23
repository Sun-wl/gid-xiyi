/**
 * Created by evan on 2016/2/28.
 */

import 'isomorphic-fetch'
import { CALL_API,HIDE_BLOCK ,SHOW_BLOCK_HIDE_ERROR, HIDE_BLOCK_SHOW_ERROR, SHOW_BLOCK,ADD_TOASTR,reqQueue} from 'common'
import {replace } from 'react-router-redux'

const  messages = {
  zh:{
    'params.invalid':'输入参数有误，请检查输入',
    'server.error':'服务器开小差，请稍后再试',
  },
  en:{
    'params.invalid':'Oh snap! Change parameters and try submitting again.',
    'server.error':'Oops! Server error. Please try later.',
  }
}

export function callApi(url, body, method, headers, state) {

  if (url.split("?")[0].indexOf('http') == -1) {
    url = __API__ + url

    headers = {
      ...headers,
      'Accept-Language':state.secret.lang
    }
    if(state.secret.ticket && state.secret.ticket !== 'undefined'){
      headers = {
        ...headers,
        'ticket': state.secret.ticket
      }
    }
    if(state.secret.openId && state.secret.openId !== 'undefined'){
      headers = {
        ...headers,
        'wxopenid': state.secret.openId
      }
    }
  }

  return fetch(url, {
    headers:headers,
    method: method||'get',
    body: body
  }).then(response => response.json().then(json => ({json, response}))).then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject({code: 500, msg: messages[state.secret.lang]['server.error']})
    }
    if(!json.code){
      return Object.assign({}, json)
    } else if (json.code === 200) {
      return (json.data || {})
    }else if(json.code === 400){
      return Promise.reject( {code: 400,msg: messages[state.secret.lang]['params.invalid'] })
    } else {
      return Promise.reject(json)
    }
  })
}

export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const  state  = store.getState()

  let {url} = callAPI

  if(((state.secret.openId||'') || (state.secret.ticket ||'')).length < 16 && url.indexOf('authorize') < 0){
    reqQueue.push({action:action,next:next})
    return
  }

  call(action,store,next)
}


export function call(action,store,next) {

  const callAPI = action[CALL_API]

  const  state  = store.getState()

  let { types, url, headers, body, method} = callAPI

  if (typeof url === 'function') {
    url = url(state, action)
  }

  if (typeof url !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (typeof body === 'function') {
    body = body(state, action)
  }

  if (typeof body === 'object') {
    body = JSON.stringify(body)
  }

  method = method || 'get'

  headers = headers || {
      'Accept': 'application/json', 'Content-Type': 'application/json'
  }

  if (!Array.isArray(types) || types.length < 3) {
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const [ requestType, successType, failureType, showBlock] = types

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  next(actionWith({type: requestType}))
  if(showBlock !== HIDE_BLOCK_SHOW_ERROR ){
    next(actionWith(
      {
        type: SHOW_BLOCK,
        payload:{message:callAPI.blockMsg || (method==='get' ? 'loading': 'processing'), icon:true }
      }
    ))
  }

  callApi(url, body, method, headers, state).then(
    response => {
      next(actionWith({response, type: successType}))
      if(showBlock !== HIDE_BLOCK_SHOW_ERROR ){
        next(actionWith({type: HIDE_BLOCK}))
      }
      if(reqQueue.length >0 && url.indexOf('authorize') > -1){
        while (reqQueue.length > 0){
          let t = reqQueue.pop()
          if(t){
            call(t.action,store, t.next)
          }
        }
      }
    },
    error => {
      const errorMsg = error.msg  || messages[state.secret.lang]['server.error']
      next(actionWith({
        type: failureType,
        data:error.data,
        errorCode:error.code,
        error:errorMsg
      }))
      next(actionWith({type: HIDE_BLOCK}))
      if(showBlock){
        //next(actionWith({type: HIDE_BLOCK}))
        // next(actionWith({type: CLEAN_TOASTR}))
        if(showBlock !==  SHOW_BLOCK_HIDE_ERROR){
          next(actionWith({type: ADD_TOASTR,payload:{message:errorMsg, type:'error', options:{timeOut:2000}}}))
        }
      }else{
        next(actionWith({type: ADD_TOASTR,payload:{message:errorMsg, type:'error', options:{timeOut:2000}}}))
      }
      if(error.code === 401 && state.secret.platform === 'app'){
        store.dispatch({type:'APP_REST_STORE'})
        store.dispatch(replace('/notLogin'))
      }else if(error.code === 401 && state.secret.platform === 'wx'){
         store.dispatch(replace(`/recharge/bind?backUrl=${store.getState().router.locationBeforeTransitions.pathname}`))
      }
    }
  )
}
