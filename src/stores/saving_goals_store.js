import request from 'superagent';
import { apiPath } from '../config/config';
import { observable, action } from 'mobx';
import { handleRequest } from '../helpers/api';

export class SavingGoalsStore {
  @observable savingGoals = [];

  @action loadSavingGoals(userId) {
    handleRequest({
      method: 'GET',
      endpointPath: `users/${userId}/saving_goals`,
      onSuccess: (responseBody) => this.savingGoals = responseBody,
    });
  }

  @action setSavingGoal(userId, savingGoal) {
    handleRequest({
      method: 'POST',
      endpointPath: `users/${userId}/saving_goals`, 
      data: savingGoal,
      onSuccess: (responseBody) => this.loadSavingGoals(userId),
    });
  }

  @action updateSavingGoal(userId, savingGoalId, savingGoal) {
    handleRequest({
      method: 'PUT',
      endpointPath: `users/${userId}/saving_goals/${savingGoalId}`,
      data: savingGoal,
      onSuccess: (responseBody) => this.loadSavingGoals(userId),
    });
  }

  @action removeSavingGoal(userId, savingGoalId) {
    handleRequest({
      method: 'DELETE',
      endpointPath: `users/${userId}/saving_goals/${savingGoalId}`,
      onSuccess: (responseBody) => this.loadSavingGoals(userId),
    });
  }
}

export default new SavingGoalsStore();
