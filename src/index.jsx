import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, withRouter, browserHistory } from 'react-router';
import authStore from './stores/auth_store';
import WelcomePage from './pages/welcome_page';
import LoginPage from './pages/login_page';
import LogoutPage from './pages/logout_page';
import RegisterPage from './pages/register_page';
import DashboardPage from './pages/dashboard_page';

require('./styles/main.scss');

const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: authStore.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn
    })
  },

  componentWillMount() {
    authStore.onChange = this.updateAuth;
    authStore.login();
  },

  render() {
    return (
      this.state.loggedIn ? (
        <DashboardPage />
      ) : (
        <WelcomePage />
      )
    );
  }
});

function requireAuth(nextState, replace) {
  if (!authStore.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  <Router history={browserHistory}>
    <Route path="login" component={LoginPage} />
    <Route path="logout" component={LogoutPage} />
    <Route path="signup" component={RegisterPage} />
    <Route path="/" component={App}>
      <Route path="dashboard" component={DashboardPage} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('root'));
