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
    // amplitude.getInstance().logEvent('CREATE GOAL');
    handleRequest({
      method: 'POST',
      endpointPath: `users/${userId}/saving_goals`, 
      data: savingGoal,
      onSuccess: (responseBody) => this.loadSavingGoals(userId),
    });
  }

  @action updateSavingGoal(userId, savingGoalId, savingGoal) {
    // amplitude.getInstance().logEvent('UPDATE GOAL');
    handleRequest({
      method: 'PUT',
      endpointPath: `users/${userId}/saving_goals/${savingGoalId}`,
      data: savingGoal,
      onSuccess: (responseBody) => this.loadSavingGoals(userId),
    });
  }

  @action removeSavingGoal(userId, savingGoalId) {
    // amplitude.getInstance().logEvent('REMOVE GOAL');
    handleRequest({
      method: 'DELETE',
      endpointPath: `users/${userId}/saving_goals/${savingGoalId}`,
      onSuccess: (responseBody) => this.loadSavingGoals(userId),
    });
  }
}

export default new SavingGoalsStore();
