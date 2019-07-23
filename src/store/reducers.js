import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {reducer as toastrReducer} from 'components/toastr'
import createReducer from 'reducers/Secret'
import {reducer as formReducer}from 'redux-form'


export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    toastr: toastrReducer,
    router,
    secret:createReducer,
    form:formReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if(!store.asyncReducers[key]){
    store.asyncReducers[key] = reducer
    store.replaceReducer(makeRootReducer(store.asyncReducers))
  }
}

export default makeRootReducer
