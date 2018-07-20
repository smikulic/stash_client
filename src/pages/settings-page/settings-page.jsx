import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import amplitude from 'amplitude-js/amplitude';
import UserSettingsForm from '../../components/user-settings-form';
import Paper from 'material-ui/Paper';
import FormSubmit from '../../components/form-submit';
import { transformUserSettingsFormData } from '../../helpers/utils';
require('./settings-page.scss');

@inject('userStore')
@withRouter
@observer
class SettingsPage extends Component {
  constructor(props) {
    super(props);
    amplitude.getInstance().logEvent('Page load: Settings Page');
    this.updateSettings = this.updateSettings.bind(this);
    this.userId = props.userStore.userData.id;
  }

  componentWillMount() {
    this.props.userStore.loadUserSettings(this.userId);
  }

  updateSettings (e) {
    e.preventDefault();
    const userSettings = transformUserSettingsFormData(e.target);
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
          <div className="col-xs-push-1 col-xs-10">
            <Paper className="settings-page" zDepth={1}>
              <h3 className="col-xs-push-2 col-xs-8 settings-page--title">User Settings</h3>
              <form onSubmit={this.updateSettings}>
                <UserSettingsForm defaultSettings={this.props.userStore.userSettings} />
                <FormSubmit text="Save" />
              </form>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
};

export default SettingsPage;
