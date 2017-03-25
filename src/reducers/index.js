import {
  USER_CHANGE, PWD_CHANGE, LOGIN_USER
} from '../actions/login';
import { combineReducers } from 'redux'

function loginInput(state = { user: "", pwd: "" }, action) {
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

function user(state = {
  message: "",
  username: ""
  }, action) {

  switch(action.type) {
    case LOGIN_USER:
      if (action.loginResponse.result === 'SUCCESS') {
        state = {...state,
            message : "Welcome " + action.loginResponse.username,
            username: "",
            timestamp: action.timestamp
          }
      }
      else {
        state = {...state,
            message : "Invalid username/password.",
            username: "",
            timestamp: action.timestamp
          }
      }
      return {...state,
        message: "",
        username: "",
        timestamp: action.timestamp
      }
      default:
        return state
  }
}

const reducer = combineReducers({user, loginInput})

export default reducer
