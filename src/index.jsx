import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';
import amplitude from 'amplitude-js/amplitude';
// Stores
import authStore from './stores/auth_store';
import savingGoalsStore from './stores/saving_goals_store';
import accountsStore from './stores/accounts_store';
import userStore from './stores/user_store';
// Components
import Navigation from './components/navigation';
// Pages
import WelcomePage from './pages/welcome-page';
import LoginPage from './pages/login-page';
import ResetPasswordPage from './pages/reset-password-page';
import NewPasswordPage from './pages/new-password-page';
import RegisterPage from './pages/register-page';
import DashboardPage from './pages/dashboard-page';
import AccountsPage from './pages/accounts-page';
import SettingsPage from './pages/settings-page';
// Third party components
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

require('./styles/main.scss');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Amplitude Analytics
amplitude.getInstance().init('51522749830c034bbd73e8a7de67160d', null, {
  // optional configuration options
  saveEvents: true,
  includeReferrer: true,
});

const stores = {
  savingGoalsStore,
  accountsStore,
  authStore,
  userStore,
};

// For easier debugging
window._____APP_STATE_____ = stores;

class App extends Component {
  state = {
    loggedIn: authStore.loggedIn(),
  }

  updateAuth(loggedIn) {
    // When commented out no bugs detected in development stage
    // this.setState({
    //   loggedIn
    // })
  }

  componentWillMount() {
    authStore.onChange = this.updateAuth;
  }

  handleSignOut() {
    authStore.logout();
    browserHistory.push('/');
  }

  render() {
    if (this.state.loggedIn && this.props.location.pathname === '/') {
      browserHistory.push('/dashboard');
    }
    if (this.state.loggedIn) {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div className="app-wrapper">
            <Navigation authStore={authStore} handleSignOut={this.handleSignOut} />
            {this.props.children}
          </div>
        </MuiThemeProvider>
      );
    }
    return <WelcomePage />;
  }
};

function requireAuth(nextState, replace) {
  if (!authStore.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path="login" component={LoginPage} />
      <Route path="signup" component={RegisterPage} />
      <Route path="new_password" component={NewPasswordPage} />
      <Route path="reset_password" component={ResetPasswordPage} />
      <Route path="/" component={App}>
        <Route path="dashboard" component={DashboardPage} onEnter={requireAuth} />
        <Route path="accounts" component={AccountsPage} onEnter={requireAuth} />
        <Route path="settings" component={SettingsPage} onEnter={requireAuth} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
