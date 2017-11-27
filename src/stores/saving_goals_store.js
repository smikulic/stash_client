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

  @action setSavingGoal(userId, savingGoal) {
    request
      .post(`${apiPath()}/api/users/${userId}/saving_goals`)
      .send(savingGoal)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.loadSavingGoals(userId);
        }
      });
  }

  @action updateSavingGoal(userId, savingGoalId, savingGoal) {
    request
      .put(`${apiPath()}/api/users/${userId}/saving_goals/${savingGoalId}`)
      .send(savingGoal)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.loadSavingGoals(userId);
        }
      });
  }

  @action removeSavingGoal(userId, savingGoalId) {
    request
      .delete(`${apiPath()}/api/users/${userId}/saving_goals/${savingGoalId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.loadSavingGoals(userId);
        }
      });
  }
}

export default new SavingGoalsStore();
