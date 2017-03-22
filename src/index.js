import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormControl } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import store from './store';
import { login, setLoginDetails } from './actions/login';
import { Provider, connect } from 'react-redux';
import DevTools from './devtools';

class App extends Component {
  componentWillMount(){
    const { dispatch, } = this.props;
    let storedSessionLogin = sessionStorage.getItem('login');
    if(storedSessionLogin){
      dispatch(
        setLoginDetails(JSON.parse(storedSessionLogin).loginResponse));
    }
  }
  handleSelect(){
    const { dispatch, } = this.props;
    dispatch(
      login(
            {
              username:this.refs.username.getValue(),
              password:this.refs.password.getValue()
            }))
  }

  renderWelcomeMessage(){
    const { user } = this.props
    return (<div>
      {user.message}
      </div>);
  }

  renderInput(){
    return (<div>
      <FormControl type="text" ref="username" placeholder="username" />
      <br/>
      <FormControl type="password" ref="password" placeholder="password" />
      <br/>
      <Button onClick={this.handleSelect.bind(this)}>Log in</Button>
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
          <Col xs={12}>
            {this.renderInput()}
          </Col>
          <Col xs={12}>
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

const LoginApp = connect(mapStateToProps)(App);

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
