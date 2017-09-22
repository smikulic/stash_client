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
import SavingGoals from '../components/SavingGoals';
import SavingGoalForm from '../components/SavingGoalForm';
import StatusOverview from '../components/status-overview';
import UserSettingsForm from '../components/user-settings-form';

require('./dashboard-page.scss');

const customDialogStyle = {
  position: 'absolute',
  top: '5%',
  width: '50%',
  maxWidth: 'none',
  transform: 'translate(50%, 64px)',
};

@inject('userStore')
@withRouter
@observer
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.openSavingGoalForm = this.openSavingGoalForm.bind(this);
    this.userId = props.userStore.userData.id;

    this.state = {
      savingGoalFormActive: false,
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
  
  closeSettingsForm = () => {
    this.props.userStore.setUserSettings(this.userId);
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        className="button--cancel"
        onTouchTap={this.closeSavingGoalForm}
      />,
      <FlatButton
        label="Confirm"
        className="button--confirm"
        onTouchTap={this.closeSavingGoalForm}
      />,
    ];

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
              <SavingGoals userData={this.props.userStore.userSettings} />
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
          actions={actions}
          modal={false}
          contentStyle={customDialogStyle}
          open={this.state.savingGoalFormActive}
          onRequestClose={this.closeSavingGoalForm}
        >
          <SavingGoalForm />
        </Dialog>

        <Dialog
          title="Edit Settings"
          actions={actions}
          modal={false}
          contentStyle={customDialogStyle}
          open={this.props.userStore.userSettings.length == 0}
          onRequestClose={this.closeSavingGoalForm}
        >
          <UserSettingsForm />
        </Dialog>
      </div>
    )
  }
};

export default DashboardPage;
