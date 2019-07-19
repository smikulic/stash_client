import React from 'react';
import { Link, browserHistory } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
require('./navigation.scss');

export default function Navigation(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClickMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  return (
    <ul className="navigation">
      <Link to="/dashboard">
        <li className="navigation-element navigation--logo"></li>
        <li className="navigation-element navigation--title">Scroogevault</li>
      </Link>
      <Link to="/dashboard">
        <li className="navigation-element navigation--item">Overview</li>
      </Link>
      <Link to="/accounts">
        <li className="navigation-element navigation--item">Accounts</li>
      </Link>
      <li className="navigation-element navigation--dropdown">
        <IconButton onClick={handleClickMenu}><MoreVertIcon className="navigation--user-dropdown-icon" /></IconButton>
        <Menu
          id="sv-dots-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => {
            handleCloseMenu()
            browserHistory.push('/settings')
          }}>
            Settings
          </MenuItem>
          <MenuItem onClick={props.handleSignOut}>
            Sign out
          </MenuItem>
        </Menu>
      </li>
      <li className="navigation-element navigation--user-email">
        {props.authStore.getUserData() && props.authStore.getUserData().email.replace(/^"(.+(?="$))"$/, '$1')}
      </li>
    </ul>
  );
}
