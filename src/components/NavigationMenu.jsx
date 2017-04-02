import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import authStore from '../stores/auth_store';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const menuItemStyle = {
  padding: 0,
  fontSize: 14,
  lineHeight: '40px',
  minHeight: 38,
  height: 40
};

require('../styles/modules/_navigationMenu.scss');

class NavigationMenu extends Component {
  constructor() {
    super();
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    authStore.logout();
    browserHistory.push('/');
  }

  render() {
    const userData = authStore.getUserData();

    return (
      <div>
        <span className="user-email">{userData.email.replace(/^"(.+(?="$))"$/, '$1')}</span>
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon className="user-dropdown-icon" /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'middle'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem
            primaryText="Help"
            style={menuItemStyle}
          />
          <MenuItem
            onClick={this.handleOnClick}
            primaryText="Sign out"
            style={menuItemStyle}
          />
        </IconMenu>
      </div>
    );
  }
}

export default NavigationMenu;
