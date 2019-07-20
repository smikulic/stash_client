import React from 'react';
import { Link, browserHistory } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
require('./navigation.scss');

export default function Navigation(props) {
  const [navigationDropdownMenuOpen, setNavigationDropdownMenuOpen] = React.useState(false);
  
  function toggleNavigationDropdownMenu() {
    setNavigationDropdownMenuOpen(!navigationDropdownMenuOpen);
  }

  function handleCloseMenu() {
    setNavigationDropdownMenuOpen(false);
  }

  return (
    <div className="navigation">
      <div className="navigation-left">
        <Link to="/dashboard" onClick={handleCloseMenu} className="navigation-logo-wrapper">
          <div className="navigation-element navigation--logo"></div>
          <div className="navigation-element">Scroogevault</div>
        </Link>
        <Link to="/dashboard" onClick={handleCloseMenu}>
          <div className="navigation-element">Overview</div>
        </Link>
        <Link to="/accounts" onClick={handleCloseMenu}>
          <div className="navigation-element">Accounts</div>
        </Link>
      </div>

      <div className="navigation-right">
        <div className="navigation-element">
          {props.authStore.getUserData() && props.authStore.getUserData().email.replace(/^"(.+(?="$))"$/, '$1')}
        </div>
        <div className="navigation-element">
          <IconButton onClick={toggleNavigationDropdownMenu}>
            <MoreVertIcon className="navigation--user-dropdown-icon" />
          </IconButton>
          { navigationDropdownMenuOpen && (
            <div className="navigation--dropdown-menu">
              <div
                className="navigation--dropdown-menu-item"
                onClick={() => {
                  handleCloseMenu()
                  browserHistory.push('/settings')
                }}
              >
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
