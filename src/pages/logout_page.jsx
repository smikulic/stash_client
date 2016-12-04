import React, { Component } from 'react';
import authStore from '../stores/auth_store';

class LogoutPage extends Component {
  componentDidMount() {
    authStore.logout();
  }

  render() {
    return <p>You are now logged out</p>
  }
};

export default LogoutPage;
