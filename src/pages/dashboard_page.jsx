import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SavingGoals from '../components/SavingGoals';
import SavingGoalForm from '../components/SavingGoalForm';

const floatingButtonStyle = {
  position: 'absolute',
  bottom: 15,
  right: 15,
};

const dashboardItemOneStyle = {
  height: 120,
  width: '100%',
  margin: '10px auto',
  padding: 5,
  display: 'inline-block',
};

const customDialogStyle = {
  position: 'absolute',
  top: '5%',
  width: '80%',
  maxWidth: 'none',
  transform: 'translate(12.5%, 64px)',
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
    const spendThisMonth = 'N/A';
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.closeSavingGoalForm}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.closeSavingGoalForm}
      />,
    ];

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <Paper style={dashboardItemOneStyle} zDepth={1}>
              <h3>Financial overview</h3>
              <div>Available this month:</div>
              <div>{spendThisMonth}</div>
            </Paper>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Paper style={dashboardItemOneStyle} zDepth={1}>
              <SavingGoals />
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
