import { combineReducers } from 'redux'
import { user } from './user'
import { loginInput } from './login_input'

const reducer = combineReducers({user, loginInput})

export default reducer
