import React from 'react';
import { Link, browserHistory } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
require('./navigation.scss');

export default function Navigation(props) {
  const [navigationDropdownMenuOpen, setNavigationDropdownMenuOpen] = React.useState(false);
  
  const toggleNavigationDropdownMenu = () => setNavigationDropdownMenuOpen(!navigationDropdownMenuOpen);

  const closeNavigationDropdownMenu = () => setNavigationDropdownMenuOpen(false);

  const linkTo = (url) => {
    closeNavigationDropdownMenu()
    browserHistory.push(url)
  }

  return (
    <div className="navigation">
      <div className="navigation-left">
        <div className="navigation-logo-wrapper" onClick={() => linkTo('/dashboard')}>
          <div className="navigation-element navigation--logo"></div>
        </div>
        <div className="navigation-left--mobile">
          <div className="navigation-element" onClick={() => linkTo('/dashboard')}>
            Overview
          </div>
          <div className="navigation-element" onClick={() => linkTo('/accounts')}>
            Accounts
          </div>
        </div>
      </div>

      <div className="navigation-right">
        <div className="navigation-element navigation-element-user">
          {props.authStore.getUserData() && props.authStore.getUserData().email.replace(/^"(.+(?="$))"$/, '$1')}
        </div>
        <div className="navigation-element">
          <IconButton onClick={toggleNavigationDropdownMenu}>
            <MoreVertIcon className="navigation--user-dropdown-icon" />
          </IconButton>
          { navigationDropdownMenuOpen && (
            <div className="navigation--dropdown-menu">
              <div className="navigation--dropdown-menu--mobile">
                <div className="navigation--dropdown-menu-item" onClick={() => linkTo('/dashboard')}>
                  Overview
                </div>
                <div className="navigation--dropdown-menu-item" onClick={() => linkTo('/accounts')}>
                  Accounts
                </div>
              </div>
              <div className="navigation--dropdown-menu-item" onClick={() => linkTo('/settings')}>
                Settings
              </div>
              <div
                className="navigation--dropdown-menu-item"
                onClick={props.handleSignOut}
              >
                Sign out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
