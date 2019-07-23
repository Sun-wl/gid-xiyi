import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import callerAPI  from './middleware/CallerAPI'
import createLogger from 'redux-logger'
import createDevTools from 'common/dev/DevTools'

export default (initialState = {}, history) => {

  const middleware = [thunk, callerAPI, routerMiddleware(history),createLogger()]
  const enhancers = []

  const devToolsExtension = (typeof window.devToolsExtension === 'function')
    ? window.devToolsExtension()
    : createDevTools.instrument()
  enhancers.push(devToolsExtension)

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers)
    })
  }

  return store
}
