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
  position: 'absolute',
  bottom: 15,
  right: 15,
};

const dashboardItemOneStyle = {
  height: 'auto',
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

// Data
const fetchedUserSettingsData = {
  fixed_income: 3000,
  fixed_expenses: 1800,
  currency: 'EUR'
};

const fetchedSavingGoalsData = [
  {
    id: '001',
    name: 'Vacation - Croatian',
    total_value: 1000,
    start_date: '2017-03-01',
    end_date: '2017-07-01',
    category: 'want',
  },
  {
    id: '002',
    name: 'Weekend trip',
    total_value: 150,
    start_date: '2017-03-01',
    end_date: '2017-04-01',
    category: 'want',
  },
  {
    id: '003',
    name: 'New car',
    total_value: 9000,
    start_date: '2017-04-01',
    end_date: '2019-10-01',
    category: 'need',
  },
  {
    id: '004',
    name: 'New MacbookPro',
    total_value: 1000,
    start_date: '2017-04-01',
    end_date: '2018-12-01',
    category: 'need',
  },
  {
    id: '005',
    name: 'New Glasses (saved half already)',
    total_value: 150,
    start_date: '2017-04-01',
    end_date: '2018-04-01',
    category: 'need',
  },
  {
    id: '006',
    name: '2 new phones for wife and me',
    total_value: 1000,
    start_date: '2017-04-01',
    end_date: '2019-04-01',
    category: 'need',
  }
];

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
              <StatusOverview
                savingGoals={fetchedSavingGoalsData}
                userData={fetchedUserSettingsData}
              />
            </Paper>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Paper style={dashboardItemOneStyle} zDepth={1}>
              <SavingGoals
                savingGoals={fetchedSavingGoalsData}
                userData={fetchedUserSettingsData}
              />
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
