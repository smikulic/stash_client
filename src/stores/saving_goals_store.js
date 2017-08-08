import request from 'superagent';
import { apiPath } from '../config/config';
import { observable, action } from 'mobx';

export class SavingGoalsStore {
  @observable savingGoals = [];

  @action loadSavingGoals(userId) {
    request
      .get(`${apiPath()}/api/users/${userId}/saving_goals`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.savingGoals = res.body;
        }
      });
  }
}

export default new SavingGoalsStore();
