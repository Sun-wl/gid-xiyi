import React from 'react'
import ReactDOM from 'react-dom'
import {useRouterHistory} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {syncHistoryWithStore,push,goBack} from 'react-router-redux'
import createStore from './store/configureStore'
import {lang,getQueryJson,TOASTR_CLEAN_ALL,sleep} from './common'
import AppContainer from './containers/AppContainer'
import {addLocaleData} from 'react-intl'
import {toastr} from 'components/toastr'


const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: window.__BASENAME__
})


const initialState = window.___INITIAL_STATE__
const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

// 判断是否需要滚动到页面顶端
let prevLocation = {
  state: {
    modal: false
  }
};

history.listenBefore(location => {
  //如果是返回操作不需要滚动到页面顶端
  const action = location.action !== 'POP'
  const modal = (location.state || {}).modal
  const prevModal = (prevLocation.state || {}).modal
  if (action && !modal && !prevModal) {
    const pathChanged = prevLocation.pathname !== location.pathname
    const hashChanged = prevLocation.hash !== location.hash
    if (pathChanged || hashChanged) window.scrollTo(0, 0)
  }
  // if(location.action === 'POP'){
  //   toastr.hideOverlay()
  // }
  // 页面跳转前清除一切toastr
  store.dispatch({type: TOASTR_CLEAN_ALL});
  prevLocation = location
})




// history.listen(location=>{
//   const action = (location.state || {}).action
//   if(action ==='REPLACE'){
//     window.history.pushState(null, null, location.href)
//   }
// })

const MOUNT_ELEMENT = document.getElementById('root')

if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// 语言设置
const locale = lang()

const startup = (routes, routerKey, locale, messages) => {
  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
      routerKey={routerKey}
      locale={locale}
      messages={messages}
    />, MOUNT_ELEMENT)
}

// 附加中文国际化资源
const startupWithZhLocalData = (routes, key) => {
  if (!global.Intl) {
    require.ensure(['intl', 'react-intl/locale-data/zh', './i18n/zh'], (require) => {
      require('intl')
      const localData = require('react-intl/locale-data/zh')
      const messages = require('./i18n/zh').default
      addLocaleData(localData)
      startup(routes, key, locale, messages)
    }, 'ZhIntlBundle')
  } else {
    require.ensure(['react-intl/locale-data/zh', './i18n/zh'], (require) => {
      const localData = require('react-intl/locale-data/zh')
      const messages = require('./i18n/zh').default
      addLocaleData(localData)
      startup(routes, key, locale, messages)
    }, 'ZhIntlBundleLocale')
  }
}

// 附加英文文国际化资源
const startupWithEnLocalData = (routes, key) => {
  if (!global.Intl) {
    require.ensure(['intl', 'react-intl/locale-data/en', './i18n/en'], (require) => {
      require('intl')
      const localData = require('react-intl/locale-data/en')
      const messages = require('./i18n/en').default
      addLocaleData(localData)
      startup(routes, key, locale, messages)
    }, 'EnhIntlBundle')
  } else {
    require.ensure(['react-intl/locale-data/en', './i18n/en'], (require) => {
      const localData = require('react-intl/locale-data/en')
      const messages = require('./i18n/en').default
      addLocaleData(localData)
      startup(routes, key, locale, messages)
    }, 'EnhIntlBundleLocale')
  }
}

const render = (routes, key = null) => {
  if (locale === 'zh') {
    startupWithZhLocalData(routes(store), key)
  } else {
    startupWithEnLocalData(routes(store), key)
  }
}


// window 绑定一个gPush调转的事件
window.gPush1 = (path, data) => {


  if(location.href.indexOf("add") < 0){
    //===========================
    //之前的页面可能有提示框或者其它的消息
    store.dispatch({type: TOASTR_CLEAN_ALL});
    //===========================
  }


  store.dispatch(push({
    pathname: path.split('?')[0],
    query: {
      ...getQueryJson(path),
      ...data,
    }
  }))
}
//protocol

window.gCanBack1 =()=> {
  if(location.href.indexOf("/order/list") >-1||
     location.href.indexOf("/xiyi/jingxi")>-1||
     location.href.indexOf("/xiyi/book/daixi")>-1
    ){
    return false
  }else{
    return true
  }

}

window.gBack1= (n=-1) => store.dispatch(goBack(n))

export default render
