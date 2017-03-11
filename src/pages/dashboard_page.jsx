import React, { Component } from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from '../components/NavigationMenu';
import SavingGoals from '../components/SavingGoals';

class DashboardPage extends Component {
  render() {
    const spendThisMonth = 'N/A';

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AppBar
            title="ScroogeVault"
            iconElementLeft={<span></span>}
            iconElementRight={<NavigationMenu />}
          />
          <h1>Financial overview</h1>
          <FlatButton label="Create Saving Goal" />
          <SavingGoals />
          <div>
            You can spend this month: {spendThisMonth}
          </div>
        </div>

      </MuiThemeProvider>
    )
  }
};

export default DashboardPage;
