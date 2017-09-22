import request from 'superagent';
import { apiPath } from '../config/config';
import { observable, action } from 'mobx';

export class UserStore {
  @observable userData = JSON.parse(localStorage.SVuserData);
  @observable userSettings = {
    fixed_income: 0,
    fixed_expenses: 0,
    currency: 'EUR',
    default: true,
  };

  @action loadUserSettings(userId) {
    request
      .get(`${apiPath()}/api/users/${userId}/settings`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.userSettings = res.body;
        }
      });
  }

  @action setUserSettings(userId) {
    console.log("object");
    this.userSettings = {
      fixed_income: 0,
      fixed_expenses: 0,
      currency: 'EUR',
    }
  }
}

export default new UserStore();
