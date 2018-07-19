import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import amplitude from 'amplitude-js/amplitude';
import { isEmpty } from 'lodash';
import { sanitizeValue, transformUserSettingsFormData } from '../../helpers/utils';
import PageItemWrapper from '../../components/page-item-wrapper';
import DialogWrapper from '../../components/dialog-wrapper';
import SavingGoalsIndex from '../../components/saving-goals-index';
import SavingGoalForm from '../../components/saving-goal-form';
import StatusOverview from '../../components/status-overview';
import AccountsIndex from '../../components/accounts-index';
import AccountForm from '../../components/account-form';
import UserSettingsForm from '../../components/user-settings-form';

@inject('savingGoalsStore', 'accountsStore', 'userStore')
@withRouter
@observer
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    amplitude.getInstance().logEvent('Page load: Overview Index');

    this.openSavingGoalForm = this.openSavingGoalForm.bind(this);
    this.submitSettingsForm = this.submitSettingsForm.bind(this);
    this.submitSavingGoalForm = this.submitSavingGoalForm.bind(this);
    this.userId = props.userStore.userData.id;

    this.openAccountForm = this.openAccountForm.bind(this);
    this.submitAccountForm = this.submitAccountForm.bind(this);

    this.state = {
      savingGoalFormActive: false,
      accountFormActive: false,
    };
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
    const userSettings = transformUserSettingsFormData(e.target);
    this.props.userStore.setUserSettings(this.userId, userSettings);
  };

  submitSavingGoalForm (e) {
    e.preventDefault();
    const savingGoal = {
      description: e.target['description'].value,
      deadline: e.target['deadline'].value,
      value: sanitizeValue(e.target['budget'].value),
    };

    this.props.savingGoalsStore.setSavingGoal(this.userId, savingGoal);
    this.closeSavingGoalForm();
  };

  openAccountForm = () => {
    this.setState({ accountFormActive: true });
  };

  closeAccountForm = () => {
    this.setState({ accountFormActive: false });
  };

  submitAccountForm (e) {
    e.preventDefault();
    const account = {
      description: e.target['description'].value,
      currency: e.target['currency'].value,
      status: e.target['status'].value,
      name: e.target['name'].value,
      balance: sanitizeValue(e.target['balance'].value),
    };
    if (account.balance && account.name && account.currency && account.status) {
      this.props.accountsStore.setAccount(this.userId, account);
    }

    this.closeAccountForm();
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="col-xs-4">
          <PageItemWrapper>
            <StatusOverview
              userData={this.props.userStore.userSettings}
            />
          </PageItemWrapper>
        </div>
        <div className="col-xs-8">
          <PageItemWrapper>
            <AccountsIndex
              userData={this.props.userStore.userSettings}
              handleAddAccount={this.openAccountForm}
            />
          </PageItemWrapper>
        </div>
        <div className="col-xs-12">
          <PageItemWrapper>
            <SavingGoalsIndex
              userData={this.props.userStore.userSettings}
              handleAddSavingGoal={this.openSavingGoalForm}
            />
          </PageItemWrapper>
        </div>
        <DialogWrapper
          open={this.state.savingGoalFormActive}
          onRequestClose={this.closeSavingGoalForm}
          onSubmit={this.submitSavingGoalForm}
          submitText="Create"
        >
          <SavingGoalForm title="Create new goal" />
        </DialogWrapper>
        <DialogWrapper
          open={!this.props.userStore.userSettingsLoading && isEmpty(this.props.userStore.userSettings)}
          onRequestClose={this.closeSavingGoalForm}
          onSubmit={this.submitSettingsForm}
          submitText="Start Saving"
        >
          <UserSettingsForm title="Welcome! Let's get started!" />
        </DialogWrapper>
        <DialogWrapper
          open={this.state.accountFormActive}
          onRequestClose={this.closeAccountForm}
          onSubmit={this.submitAccountForm}
          submitText="Add"
        >
          <AccountForm title="Add bank account" />
        </DialogWrapper>
      </div>
    )
  }
};

export default DashboardPage;
