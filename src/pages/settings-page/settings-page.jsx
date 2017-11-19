import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import UserSettingsForm from '../../components/user-settings-form';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

require('./settings-page.scss');

@inject('userStore')
@withRouter
@observer
class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.updateSettings = this.updateSettings.bind(this);
    this.userId = props.userStore.userData.id;
  }

  componentWillMount() {
    this.props.userStore.loadUserSettings(this.userId);
  }

  updateSettings (e) {
    e.preventDefault();
    const userSettings = {
      average_monthly_incomes: e.target['avgIncome'].value,
      average_monthly_expenses: e.target['avgExpenses'].value,
      main_currency: e.target['currency'].value,
    };
    this.props.userStore.updateUserSettings(
      this.userId,
      this.props.userStore.userSettings.id,
      userSettings,
    );
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <Paper className="settings-page" zDepth={1}>
              <h3 className="settings-page--title">User Settings</h3>
              <form onSubmit={this.updateSettings}>
                <UserSettingsForm defaultSettings={this.props.userStore.userSettings} />
                <FlatButton label="Submit" type="submit" className="button--confirm button--right" />
              </form>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
};

export default SettingsPage;
