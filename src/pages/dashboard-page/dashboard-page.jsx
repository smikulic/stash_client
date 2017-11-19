import React, { Component } from 'react';
import moment from 'moment';
import symbolFromCurrency from 'currency-symbol-map';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SavingGoalsIndex from '../../components/saving-goals-index';
import SavingGoalForm from '../../components/saving-goal-form';
import StatusOverview from '../../components/status-overview';
import UserSettingsForm from '../../components/user-settings-form';
import { isEmpty } from 'lodash';

require('./dashboard-page.scss');

const customDialogStyle = {
  position: 'absolute',
  top: '5%',
  width: '50%',
  maxWidth: 'none',
  transform: 'translate(50%, 64px)',
};

@inject('savingGoalsStore', 'userStore')
@withRouter
@observer
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.openSavingGoalForm = this.openSavingGoalForm.bind(this);
    this.submitSettingsForm = this.submitSettingsForm.bind(this);
    this.submitSavingGoalForm = this.submitSavingGoalForm.bind(this);
    this.userId = props.userStore.userData.id;

    this.state = { savingGoalFormActive: false };
  }

  componentWillMount() {
    this.props.userStore.loadUserSettings(this.userId);
  }

  openSavingGoalForm = () => {
    this.setState({ savingGoalFormActive: true });
  };

  closeSavingGoalForm = () => {
    this.setState({ savingGoalFormActive: false });
  };
  
  submitSettingsForm (e) {
    e.preventDefault();
    const userSettings = {
      average_monthly_incomes: e.target['avgIncome'].value,
      average_monthly_expenses: e.target['avgExpenses'].value,
      main_currency: e.target['currency'].value,
    };
    this.props.userStore.setUserSettings(this.userId, userSettings);
  };

  submitSavingGoalForm (e) {
    e.preventDefault();
    const savingGoal = {
      description: e.target['description'].value,
      deadline: e.target['deadline'].value,
      value: e.target['value'].value,
    };
    this.props.savingGoalsStore.setSavingGoal(this.userId, savingGoal);
    this.closeSavingGoalForm();
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <Paper className="dashboard-item" zDepth={1}>
              <StatusOverview userData={this.props.userStore.userSettings} />
            </Paper>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Paper className="dashboard-item" zDepth={1}>
              <SavingGoalsIndex userData={this.props.userStore.userSettings} />
            </Paper>
          </div>
        </div>

        <FloatingActionButton
          secondary={true}
          className="button--floating"
          onClick={this.openSavingGoalForm}
        >
          <ContentAdd />
        </FloatingActionButton>

        <Dialog
          title="Enter savings goal"
          modal={false}
          contentStyle={customDialogStyle}
          open={this.state.savingGoalFormActive}
          onRequestClose={this.closeSavingGoalForm}
        >
          <form onSubmit={this.submitSavingGoalForm}>
            <SavingGoalForm />
            <FlatButton label="Submit" type="submit" className="button--confirm button--right" />
          </form>
        </Dialog>

        <Dialog
          title="Edit Settings"
          modal={false}
          contentStyle={customDialogStyle}
          open={!this.props.userStore.userSettingsLoading && isEmpty(this.props.userStore.userSettings)}
          onRequestClose={this.closeSavingGoalForm}
        >
          <form onSubmit={this.submitSettingsForm}>
            <UserSettingsForm />
            <FlatButton label="Submit" type="submit" className="button--confirm button--right" />
          </form>
        </Dialog>
      </div>
    )
  }
};

export default DashboardPage;
