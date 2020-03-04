import { observable, action } from 'mobx';
import amplitude from 'amplitude-js/amplitude';
import { handleRequest } from '../helpers/api';

export class SavingGoalsStore {
  @observable savingGoals = [];

  @action loadSavingGoals(userId, sortByQuery) {
    const sortQuery = sortByQuery || '';
    handleRequest({
      method: 'GET',
      endpointPath: `users/${userId}/saving_goals${sortQuery}`,
      onSuccess: (responseBody) => this.savingGoals = responseBody,
    });
  }

  @action setSavingGoal(userId, savingGoal) {
    amplitude.getInstance().logEvent('CREATED Saving Goal');
    handleRequest({
      method: 'POST',
      endpointPath: `users/${userId}/saving_goals`, 
      data: savingGoal,
      onSuccess: () => this.loadSavingGoals(userId),
    });
  }

  @action updateSavingGoal(userId, savingGoalId, savingGoal) {
    amplitude.getInstance().logEvent('UPDATED Saving Goal');
    handleRequest({
      method: 'PUT',
      endpointPath: `users/${userId}/saving_goals/${savingGoalId}`,
      data: savingGoal,
      onSuccess: () => this.loadSavingGoals(userId),
    });
  }

  @action removeSavingGoal(userId, savingGoalId) {
    amplitude.getInstance().logEvent('REMOVED Saving Goal');
    handleRequest({
      method: 'DELETE',
      endpointPath: `users/${userId}/saving_goals/${savingGoalId}`,
      onSuccess: () => this.loadSavingGoals(userId),
    });
  }
}

export default new SavingGoalsStore();
