import React, { Component } from 'react';
import moment from 'moment';
import symbolFromCurrency from 'currency-symbol-map';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SavingGoals from '../components/SavingGoals';
import SavingGoalForm from '../components/SavingGoalForm';
import StatusOverview from '../components/status-overview';

const floatingButtonStyle = {
  position: 'fixed',
  bottom: 15,
  right: 15,
};

const dashboardItemOneStyle = {
  height: 'auto',
  width: '100%',
  margin: '10px auto',
  padding: 5,
  display: 'inline-block',
  background: '#F5F5F5',
};

const customDialogStyle = {
  position: 'absolute',
  top: '5%',
  width: '50%',
  maxWidth: 'none',
  transform: 'translate(50%, 64px)',
};

const cancelButtonStyle = {
  color: '#818C9D',
};

const confirmButtonStyle = {
  color: '#16A2E0',
};

// Data
const fetchedUserSettingsData = {
  fixed_income: 3000,
  fixed_expenses: 1800,
  currency: 'EUR'
};

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.openSavingGoalForm = this.openSavingGoalForm.bind(this);

    this.state = {
      savingGoalFormActive: false,
    };
  }

  openSavingGoalForm = () => {
    this.setState({ savingGoalFormActive: true });
  };

  closeSavingGoalForm = () => {
    this.setState({ savingGoalFormActive: false });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        style={cancelButtonStyle}
        onTouchTap={this.closeSavingGoalForm}
      />,
      <FlatButton
        label="Confirm"
        style={confirmButtonStyle}
        onTouchTap={this.closeSavingGoalForm}
      />,
    ];

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <Paper style={dashboardItemOneStyle} zDepth={1}>
              <StatusOverview userData={fetchedUserSettingsData} />
            </Paper>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Paper style={dashboardItemOneStyle} zDepth={1}>
              <SavingGoals userData={fetchedUserSettingsData} />
            </Paper>
          </div>
        </div>

        <FloatingActionButton
          secondary={true}
          style={floatingButtonStyle}
          onClick={this.openSavingGoalForm}
        >
          <ContentAdd />
        </FloatingActionButton>

        <Dialog
          title="Enter savings goal"
          actions={actions}
          modal={false}
          contentStyle={customDialogStyle}
          open={this.state.savingGoalFormActive}
          onRequestClose={this.closeSavingGoalForm}
        >
          <SavingGoalForm />
        </Dialog>
      </div>
    )
  }
};

export default DashboardPage;
