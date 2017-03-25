import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import store from './store';
import { login, userChange, pwdChange } from './actions/login';
import { Provider, connect } from 'react-redux';
import DevTools from './devtools';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {
  renderWelcomeMessage() {
    const { msg } = this.props
    return (<div>
      {msg}
      </div>);
  }

  renderInput() {
    return (<div>
      <FormControl
        type="text"
        value={ this.props.user }
        placeholder="username"
        onChange={ (e) => this.props.onUserChange(e.target.value) }/>
      <br/>
      <FormControl
        type="password"
        value={ this.props.pwd }
        placeholder="password"
        onChange={ (e) => this.props.onPwdChange(e.target.value) }/>
      <br/>
      <Button onClick={() => this.props.onLogin(this.props.user, this.props.pwd) }>Log in</Button>
    </div>)
  }

  render () {
    return (
      <Grid>
        <DevTools store={store}  />
        <Row>
          <Col xs={12} md={4}>
            <h3>Please log in...!</h3>
          </Col>
          <Col xs={4} md={4}>
            {this.renderInput()}
          </Col>
          <Col xs={4} md={4}>
            {this.renderWelcomeMessage()}
          </Col>
        </Row>
      </Grid>
    );
  }
};

function mapStateToProps(state) {
  const { user } = state;
  return {user}
}

const { createClass, PropTypes } = React;

const AppBox = createClass({
  conextTypes: {
    store: PropTypes.object
  },
  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.forceUpdate() )
  },
  componentWillUnmount() {
    this.unsubscribe();
  },
  render() {
    const { user, loginInput } = store.getState();
    return (
        <App
          user={loginInput.user}
          pwd={loginInput.pwd}
          msg={user.message}
          onUserChange={ (user) => this.props.dispatch(userChange(user)) }
          onPwdChange={ (pwd) => this.props.dispatch(pwdChange(pwd)) }
          onLogin={ () => this.props.dispatch(login()) }
        />
    );
  }
})

const LoginApp = connect(mapStateToProps)(AppBox);

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <LoginApp />
      </Provider>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
