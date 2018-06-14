import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';
import amplitude from 'amplitude-js/amplitude';
import { handleRequest } from '../helpers/api';

export class UserStore {
  @observable userData = JSON.parse(localStorage.SVuserData);
  @observable userSettings = [];
  @observable userSettingsLoading = true;

  @action loadUserSettings(userId) {
    handleRequest({
      method: 'GET',
      endpointPath: `users/${userId}/settings/userSettings`,
      onError: (error) => {
        console.warn(error);
        this.userSettingsLoading = false;
      },
      onSuccess: (responseBody) => {
        this.userSettings = responseBody[0];
        this.userSettingsLoading = false;
      },
    });
  }

  @action setUserSettings(userId, userSettings) {
    amplitude.getInstance().logEvent('CREATED User Settings');
    handleRequest({
      method: 'POST',
      endpointPath: `users/${userId}/settings`,
      data: userSettings,
      onSuccess: (responseBody) => this.userSettings = responseBody,
    });
  }

  @action updateUserSettings(userId, settingsId, userSettings) {
    amplitude.getInstance().logEvent('UPDATED User Settings');
    handleRequest({
      method: 'PUT',
      endpointPath: `users/${userId}/settings/${settingsId}`,
      data: userSettings,
      onSuccess: (responseBody) => {
        this.userSettings = responseBody;
        browserHistory.push('/dashboard');
      },
    });
  }
}

export default new UserStore();
