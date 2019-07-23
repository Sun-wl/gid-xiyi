import { applyMiddleware,compose,createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import callerAPI  from './middleware/CallerAPI'

export default (initialState = {}, history) => {

  const middleware = [thunk, callerAPI, routerMiddleware(history)]
  const enhancers = []

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.asyncReducers = {}

  return store
}
