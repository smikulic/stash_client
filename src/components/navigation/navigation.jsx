import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

require('./navigation.scss');

class Navigation extends Component {
  render() {
    return (
      <ul className="navigation">
        <Link to="/dashboard">
          <li className="navigation-element navigation--logo"></li>
          <li className="navigation-element navigation--title">Scroogevault</li>
        </Link>
        <li className="navigation-element navigation--dropdown">
          <IconMenu
            iconButtonElement={ <IconButton><MoreVertIcon className="navigation--user-dropdown-icon" /></IconButton> }
            targetOrigin={{horizontal: 'middle', vertical: 'top'}}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          >
            <MenuItem onClick={() => browserHistory.push('/settings')}
              className="navigation--menu-item"
              primaryText="Settings"
            />
            <MenuItem onClick={this.props.handleSignOut}
              className="navigation--menu-item"
              primaryText="Sign out"
            />
          </IconMenu>
        </li>
        <li className="navigation-element navigation--user-email">
          {this.props.authStore.getUserData() && this.props.authStore.getUserData().email.replace(/^"(.+(?="$))"$/, '$1')}
        </li>
      </ul>
    );
  }
}

export default Navigation;
