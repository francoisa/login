import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { store } from './store';
import { login, setLoginDetails } from './actions/user'
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
    let user, pwd;
    return (<div>
      <input
        type="text"
        className="form-control"
        ref={ node => user = node }
        placeholder="username"/>
      <br/>
      <input
        type="password"
        className="form-control"
        ref={ node => pwd = node }
        placeholder="password"/>
      <br/>
      <Button onClick={() => this.props.onLogin(user.value, pwd.value) }>Log in</Button>
    </div>)
  }

  render () {
    return (
      <Grid>
        <DevTools store={store}  />
        <Row>
          <Col xs={4} md={4}>
            {this.renderWelcomeMessage()}
          </Col>
        </Row>
        <Row>
          <Col xs={4} md={4}>
            {this.renderInput()}
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
  componentWillMount() {
    const { dispatch } = this.props;
    let storedSessionLogin = sessionStorage.getItem('login');
    if (storedSessionLogin) {
      dispatch(setLoginDetails(JSON.parse(storedSessionLogin).loginResponse));
    }
  },
  componentDidMount() {
    this.unsubscribe = store.subscribe( () => this.forceUpdate() )
  },
  componentWillUnmount() {
    this.unsubscribe();
  },
  render() {
    const { user } = store.getState();
    return (
        <App
          msg={user.message}
          onLogin={ (u, p) => this.props.dispatch(login(u, p)) }
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
