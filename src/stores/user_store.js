import request from 'superagent';
import { browserHistory } from 'react-router';
import { apiPath } from '../config/config';
import { observable, action } from 'mobx';

export class UserStore {
  @observable userData = JSON.parse(localStorage.SVuserData);
  @observable userSettings = [];
  @observable userSettingsLoading = true;

  @action loadUserSettings(userId) {
    request
      .get(`${apiPath()}/api/users/${userId}/settings/userSettings`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.userSettings = res.body[0];
        }
        this.userSettingsLoading = false;
      });
  }

  @action setUserSettings(userId, userSettings) {
    request
      .post(`${apiPath()}/api/users/${userId}/settings`)
      .send(userSettings)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.userSettings = res.body;
        }
      });
  }

  @action updateUserSettings(userId, settingsId, userSettings) {
    request
      .patch(`${apiPath()}/api/users/${userId}/settings/${settingsId}`)
      .send(userSettings)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.userSettings = res.body;
          browserHistory.push('/dashboard');
        }
      });
  }
}

export default new UserStore();
