import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, withRouter, browserHistory } from 'react-router';
import auth from './stores/auth_store';
import WelcomePage from './pages/welcome_page';
import LoginPage from './pages/login_page';

require('./styles/main.scss');

const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth;
    auth.login();
  },

  render() {
    return (
      this.state.loggedIn ? (
        <Link to="/logout">Log out</Link>
      ) : (
        <WelcomePage />
      )
    );
  }
});

const Dashboard = React.createClass({
  render() {
    const token = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})

const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  <Router history={browserHistory}>
    <Route path="login" component={LoginPage} />
    <Route path="/" component={App}>
      <Route path="logout" component={Logout} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('root'));
