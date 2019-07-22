import React from 'react';
import { browserHistory } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NavigationLink from '../navigation-link';
require('./navigation.scss');

export default function Navigation({ authStore, handleSignOut }) {
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
          <NavigationLink linkClass="navigation-element" onClick={() => linkTo('/dashboard')} linkText="Overview" />
          <NavigationLink linkClass="navigation-element" onClick={() => linkTo('/accounts')} linkText="Accounts" />
        </div>
      </div>

      <div className="navigation-right">
        <div className="navigation-element navigation-element-user" onClick={() => linkTo('/settings')}>
          {authStore.getUserData() && authStore.getUserData().email.replace(/^"(.+(?="$))"$/, '$1')}
        </div>
        <div className="navigation-element">
          <IconButton onClick={toggleNavigationDropdownMenu}>
            <MoreVertIcon className="navigation--user-dropdown-icon" />
          </IconButton>
          { navigationDropdownMenuOpen && (
            <div className="navigation--dropdown-menu">
              <div className="navigation--dropdown-menu--mobile">
                <NavigationLink linkClass="navigation--dropdown-menu-item" onClick={() => linkTo('/dashboard')} linkText="Overview" />
                <NavigationLink linkClass="navigation--dropdown-menu-item" onClick={() => linkTo('/accounts')} linkText="Accounts" />
              </div>
              <NavigationLink linkClass="navigation--dropdown-menu-item" onClick={() => linkTo('/settings')} linkText="Settings" />
              <NavigationLink linkClass="navigation--dropdown-menu-item" onClick={handleSignOut} linkText="Sign out" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
