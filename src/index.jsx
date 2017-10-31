import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, withRouter, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';
import authStore from './stores/auth_store';
import savingGoalsStore from './stores/saving_goals_store';
import userStore from './stores/user_store';
import WelcomePage from './pages/welcome_page';
import LoginPage from './pages/login_page';
import RegisterPage from './pages/register_page';
import DashboardPage from './pages/dashboard_page';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('./styles/main.scss');

const stores = {
  savingGoalsStore,
  authStore,
  userStore,
};

// For easier debugging
window._____APP_STATE_____ = stores;

const App = React.createClass({
  getInitialState() {
    return {
      loggedIn: authStore.loggedIn(),
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn
    })
  },

  componentWillMount() {
    authStore.onChange = this.updateAuth;
  },

  handleOnClick() {
    authStore.logout();
    browserHistory.push('/');
    //window.location.reload();
  },

  render() {
    if (this.state.loggedIn) {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <div className="app-wrapper">
            <ul className="navigation">
              <li className="navigation-element navigation--logo"></li>
              <li className="navigation-element navigation--title">Scroogevault</li>
              <li className="navigation-element navigation--dropdown">
                <IconMenu
                  iconButtonElement={
                    <IconButton><MoreVertIcon className="navigation--user-dropdown-icon" /></IconButton>
                  }
                  targetOrigin={{horizontal: 'right', vertical: 'center'}}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  <MenuItem
                    onClick={this.handleOnClick}
                    primaryText="Sign out"
                    style={{
                      padding: 0,
                      fontSize: 12,
                      lineHeight: '40px',
                      minHeight: 38,
                      height: 40,
                    }}
                  />
                </IconMenu>
              </li>
              <li className="navigation-element navigation--user-email">
                {authStore.getUserData() && authStore.getUserData().email.replace(/^"(.+(?="$))"$/, '$1')}
              </li>
            </ul>
            <DashboardPage />
          </div>
        </MuiThemeProvider>
      );
    }
    return <WelcomePage />;
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
  <Provider {...stores}>
    <Router history={browserHistory}>
      <Route path="login" component={LoginPage} />
      <Route path="signup" component={RegisterPage} />
      <Route path="/" component={App}>
        <Route path="dashboard" component={DashboardPage} onEnter={requireAuth} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
