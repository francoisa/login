import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'
import App from './App';
import store from './store'
import './index.css';

function mapStateToProps(state) {
  const { user } = {...state, message: ""}
  return {user}
}

const LoginApp = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <LoginApp/>
  </Provider>,
  document.getElementById('root')
);
