import React, { Component } from 'react';
import moment from 'moment';
import symbolFromCurrency from 'currency-symbol-map';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import Dialog from 'material-ui/Dialog';
import PageItemWrapper from '../../components/page-item-wrapper';
import SavingGoalsIndex from '../../components/saving-goals-index';
import SavingGoalForm from '../../components/saving-goal-form';
import StatusOverview from '../../components/status-overview';
import UserSettingsForm from '../../components/user-settings-form';
import FormSubmit from '../../components/form-submit';
import { isEmpty } from 'lodash';
import { sanitizeValue, transformUserSettingsFormData } from '../../helpers/utils';

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
    const userSettings = transformUserSettingsFormData(e.target);
    this.props.userStore.setUserSettings(this.userId, userSettings);
  };

  submitSavingGoalForm (e) {
    e.preventDefault();
    const value = sanitizeValue(e.target['value'].value);
    const savingGoal = {
      description: e.target['description'].value,
      deadline: e.target['deadline'].value,
      value: value,
    };

    this.props.savingGoalsStore.setSavingGoal(this.userId, savingGoal);
    this.closeSavingGoalForm();
  };

  render() {
    return (
      <div className="container-fluid">
        <PageItemWrapper>
          <StatusOverview
            userData={this.props.userStore.userSettings}
          />
        </PageItemWrapper>
        <PageItemWrapper>
          <SavingGoalsIndex
            userData={this.props.userStore.userSettings}
            handleAddSavingGoal={this.openSavingGoalForm}
          />
        </PageItemWrapper>

        <Dialog
          modal={false}
          bodyClassName="dialog-body"
          contentStyle={customDialogStyle}
          open={this.state.savingGoalFormActive}
          onRequestClose={this.closeSavingGoalForm}
        >
          <form onSubmit={this.submitSavingGoalForm}>
            <SavingGoalForm title="Create new goal" />
            <div className="row">
              <div className="col-xs-5 col-xs-push-7">
                <FormSubmit text="Create" />
              </div>
            </div>
          </form>
        </Dialog>

        <Dialog
          modal={false}
          bodyClassName="dialog-body"
          contentStyle={customDialogStyle}
          open={!this.props.userStore.userSettingsLoading && isEmpty(this.props.userStore.userSettings)}
          onRequestClose={this.closeSavingGoalForm}
        >
          <form onSubmit={this.submitSettingsForm}>
            <UserSettingsForm title="Welcome! Let's get started!" />
            <FormSubmit text="Start Saving" />
          </form>
        </Dialog>
      </div>
    )
  }
};

export default DashboardPage;
