import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './devtools';
import reducer from './reducers'

const configureStore = compose(applyMiddleware(thunk), DevTools.instrument())(createStore)

const store = configureStore(reducer)

export default store
