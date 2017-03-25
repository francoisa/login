import {
  USER_CHANGE, PWD_CHANGE
} from '../actions/login_input';

export const loginInput = (state = { user: "", pwd: "" }, action) => {
  switch(action.type) {
    case USER_CHANGE:
      state = {...state, user: action.payload}
      return state
    case PWD_CHANGE:
      state = {...state, pwd: action.payload}
      return state
    default:
      return state;
    }
}
