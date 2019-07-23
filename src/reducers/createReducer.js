
export default function createReducer (initialState, actionHandlers) {
  return (state = initialState, action) => {
    if(action.type === 'APP_REST_STORE'){
      state = {...initialState}
    }
    const reduceFn = actionHandlers[action.type]
    if (!reduceFn) return state

    return { ...state, ...reduceFn(state, action) }
  }
}
