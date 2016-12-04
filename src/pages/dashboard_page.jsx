import React, { Component } from 'react';
import { Link } from 'react-router';
import authStore from '../stores/auth_store';

class DashboardPage extends Component {
  render() {
    const token = authStore.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
        <Link to="/logout" className="btn-back">Logout</Link>
      </div>
    )
  }
};

export default DashboardPage;
