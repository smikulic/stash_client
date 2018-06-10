import request from 'superagent';
import { apiPath } from '../config/config';
import { observable, action } from 'mobx';
import { getIndex, postCreate, putUpdate, deleteEntity } from '../helpers/api';

export class SavingGoalsStore {
  @observable savingGoals = [];

  @action loadSavingGoals(userId) {
    getIndex({
      endpointPath: `users/${userId}/saving_goals`,
      onError: (error) => console.warn(`error: ${error}`),
      onSuccess: (responseBody) => this.savingGoals = responseBody,
    });
  }

  @action setSavingGoal(userId, savingGoal) {
    postCreate({
      endpointPath: `users/${userId}/saving_goals`, 
      data: savingGoal,
      onError: (error) => console.warn(`error: ${error}`),
      onSuccess: (responseBody) => this.loadSavingGoals(userId),
    });
  }

  @action updateSavingGoal(userId, savingGoalId, savingGoal) {
    putUpdate({
      endpointPath: `users/${userId}/saving_goals/${savingGoalId}`,
      data: savingGoal,
      onError: (error) => console.warn(`error: ${error}`),
      onSuccess: (responseBody) => this.loadSavingGoals(userId),
    });
  }

  @action removeSavingGoal(userId, savingGoalId) {
    deleteEntity({
      endpointPath: `users/${userId}/saving_goals/${savingGoalId}`,
      onError: (error) => console.warn(`error: ${error}`),
      onSuccess: (responseBody) => this.loadSavingGoals(userId),
    });
  }
}

export default new SavingGoalsStore();
