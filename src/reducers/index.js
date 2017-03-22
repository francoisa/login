import {
  LOGIN_USER
} from '../actions/login';
import { combineReducers } from 'redux'

function user(state = {
  message: "",
  userData: {}
}, action){

  switch(action.type) {
    case LOGIN_USER:
      let message = "";
      if (action.loginResponse.result === 'SUCCESS') {
        message = "Welcome " + action.loginResponse.username;
      }
      else {
        message = "Invalid username/password."
      }
      return {
        message: message,
        timestamp: action.timestamp
      }

      default:
        return state
  }
}

const reducer = combineReducers({user})

export default reducer
