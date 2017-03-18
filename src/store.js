import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers'

const configureStore = compose(applyMiddleware(thunk))(createStore)

const store = configureStore(reducer)

export default store
