import React, { Component } from 'react';
import { Link } from 'react-router';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import NavigationMenu from '../components/NavigationMenu';
import SavingGoals from '../components/SavingGoals';

const floatingButtonStyle = {
  position: 'absolute',
  bottom: 15,
  right: 15
};

const dashboardItem = {
  height: 120,
  width: 120,
  margin: 10,
  paddingTop: 25,
  textAlign: 'center',
  display: 'inline-block',
};

class DashboardPage extends Component {
  constructor() {
    super();
    this.handleCreateSavingGoal = this.handleCreateSavingGoal.bind(this);
  }

  handleCreateSavingGoal() {
    this.props.router.push('/createSavingGoal');
  }

  render() {
    const spendThisMonth = 'N/A';
    const spendNextMonth = 'N/A';

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AppBar
            title="ScroogeVault"
            iconElementLeft={<span></span>}
            iconElementRight={<NavigationMenu />}
          />
          <h1>Financial overview</h1>
          <Paper style={dashboardItem} zDepth={1}>
            <div>Available this month:</div>
            <div>{spendThisMonth}</div>
          </Paper>
          <Paper style={dashboardItem} zDepth={1}>
            <div>Available next month:</div>
            <div>{spendNextMonth}</div>
          </Paper>
          <Link to="/createSavingGoal">Repos</Link>
          <FloatingActionButton
            secondary={true}
            style={floatingButtonStyle}
            onClick={this.handleCreateSavingGoal}
          >
            <ContentAdd />
          </FloatingActionButton>
          <SavingGoals />
        </div>

      </MuiThemeProvider>
    )
  }
};

export default DashboardPage;
