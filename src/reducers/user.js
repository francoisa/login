import {
  LOGIN_USER
} from '../actions/user';

export const user = (state = {message: "",  username: ""}, action) =>
{

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
