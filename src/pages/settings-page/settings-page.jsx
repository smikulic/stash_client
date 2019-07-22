import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import amplitude from 'amplitude-js/amplitude';
import PageItemWrapper from '../../components/page-item-wrapper';
import UserSettingsForm from '../../components/user-settings-form';
import VerticalTab from '../../components/vertical-tab';
import FormSubmit from '../../components/form-submit';
import { transformUserSettingsFormData, handleSignOut } from '../../helpers/utils';
require('./settings-page.scss');

const userSettingsTabs = {
  1: 'Main Info',
  2: 'Notifications',
  3: 'Account',
}

@inject('userStore')
@withRouter
@observer
class SettingsPage extends Component {
  constructor(props) {
    super(props);
    amplitude.getInstance().logEvent('Page load: Settings Page');
    this.updateSettings = this.updateSettings.bind(this);
    this.setUserSettingsTab = this.setUserSettingsTab.bind(this);
    this.userId = props.userStore.userData.id;

    this.state = {
      userSettingsTabSelected: userSettingsTabs[1],
    }
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

  setUserSettingsTab(tabSelected) {
    this.setState({ userSettingsTabSelected: tabSelected });
  }

  selectTabClass(tabName) {
    return this.state.userSettingsTabSelected === tabName ? 'tab selected' : 'tab';
  }

  render() {
    const { userSettingsTabSelected } = this.state;
    return (
      <div className="container-fluid">
        <div className="col-xs-12 col-sm-4 col-md-3">
          <PageItemWrapper>
            <ul className="settings-page--tab-navigation">
              { Object.values(userSettingsTabs).map((value, key) => {
                return <VerticalTab key={key} tabName={value} tabClass={this.selectTabClass(value)} onClick={this.setUserSettingsTab} />
              })}
            </ul>
          </PageItemWrapper>
        </div>
        <div className="col-xs-12 col-sm-8 col-md-9">
          <PageItemWrapper>
            <h3 className="settings-page--title">User Preferences - {userSettingsTabSelected}</h3>
            { userSettingsTabSelected === userSettingsTabs[1] && (
              <form onSubmit={this.updateSettings}>
                <UserSettingsForm defaultSettings={this.props.userStore.userSettings} />
                <FormSubmit text="Save" />
              </form>
            )}
            { userSettingsTabSelected === userSettingsTabs[2] && (
              <div>N/A at this moment</div>
            )}
            { userSettingsTabSelected === userSettingsTabs[3] && (
              <div>
                <a className="sign-out" onClick={handleSignOut}>Sign out</a>
              </div>
            )}
          </PageItemWrapper>
        </div>
      </div>
    )
  }
};

export default SettingsPage;
