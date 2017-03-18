import { combineReducers } from 'redux'

function loginReducer(state, action) {
  state = {...state}
  return state
}

const reducer = combineReducers({loginReducer})

export default reducer
