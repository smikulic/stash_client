import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import amplitude from 'amplitude-js/amplitude';
import authStore from '../../stores/auth_store';
import PageItemWrapper from '../../components/page-item-wrapper';
import UserSettingsForm from '../../components/user-settings-form';
import FormSubmit from '../../components/form-submit';
import { transformUserSettingsFormData } from '../../helpers/utils';
require('./settings-page.scss');

const userSettingsTabEnums = {
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
    this.setUserSettingsTabSelected = this.setUserSettingsTabSelected.bind(this);
    this.userId = props.userStore.userData.id;

    this.state = {
      userSettingsTabSelected: userSettingsTabEnums[1],
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

  setUserSettingsTabSelected(tabSelected) {
    this.setState({ userSettingsTabSelected: tabSelected });
  }

  selectedTabClass(tabName) {
    return this.state.userSettingsTabSelected === tabName ? 'tab selected' : 'tab';
  }

  handleSignOut() {
    authStore.logout();
    browserHistory.push('/');
  }

  render() {
    const { userSettingsTabSelected } = this.state;
    console.log(this.props.userStore.userSettings.average_monthly_incomes)

    let mainInfoTabClass = this.selectedTabClass(userSettingsTabEnums[1]);
    let notificationsTabClass = this.selectedTabClass(userSettingsTabEnums[2]);
    let accountTabClass = this.selectedTabClass(userSettingsTabEnums[3]);

    return (
      <div className="container-fluid">
        <div className="col-xs-12 col-sm-4 col-md-3">
          <PageItemWrapper>
            <ul className="settings-page--tab-navigation">
              <li className={mainInfoTabClass} onClick={() => this.setUserSettingsTabSelected(userSettingsTabEnums[1])}>
                Main info
                <i className="fa fa-angle-right"></i>
              </li>
              <li className={notificationsTabClass} onClick={() => this.setUserSettingsTabSelected(userSettingsTabEnums[2])}>
                Notifications
                <i className="fa fa-angle-right"></i>
              </li>
              <li className={accountTabClass} onClick={() => this.setUserSettingsTabSelected(userSettingsTabEnums[3])}>
                Account
                <i className="fa fa-angle-right"></i>
              </li>
            </ul>
          </PageItemWrapper>
        </div>
        <div className="col-xs-12 col-sm-8 col-md-9">
          <PageItemWrapper>
            <h3 className="settings-page--title">User Preferences - {userSettingsTabSelected}</h3>
            { userSettingsTabSelected === userSettingsTabEnums[1] && (
              <form onSubmit={this.updateSettings}>
                <UserSettingsForm defaultSettings={this.props.userStore.userSettings} />
                <FormSubmit text="Save" />
              </form>
            )}
            { userSettingsTabSelected === userSettingsTabEnums[2] && (
              <div>N/A at this moment</div>
            )}
            { userSettingsTabSelected === userSettingsTabEnums[3] && (
              <div>
                <a className="sign-out" onClick={this.handleSignOut}>Sign out</a>
              </div>
            )}
          </PageItemWrapper>
        </div>
      </div>
    )
  }
};

export default SettingsPage;
