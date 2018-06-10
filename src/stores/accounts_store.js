import request from 'superagent';
import { apiPath } from '../config/config';
import { observable, action } from 'mobx';
import { getIndex, postCreate, putUpdate, deleteEntity } from '../helpers/api';

export class AccountsStore {
  @observable accounts = [];

  @action loadAccounts(userId) {
    getIndex({
      endpointPath: `users/${userId}/bank_accounts`,
      onError: (error) => console.warn(`error: ${error}`),
      onSuccess: (responseBody) => this.accounts = responseBody,
    });
  }

  @action setAccount(userId, account) {
    postCreate({
      endpointPath: `users/${userId}/bank_accounts`,
      data: account,
      onError: (error) => console.warn(`error: ${error}`),
      onSuccess: (responseBody) => this.loadAccounts(userId),
    });
  }

  @action updateAccount(userId, accountId, account) {
    putUpdate({
      endpointPath: `users/${userId}/bank_accounts/${accountId}`,
      data: account,
      onError: (error) => console.warn(`error: ${error}`),
      onSuccess: (responseBody) => this.loadAccounts(userId),
    });
  }

  @action removeAccount(userId, accountId) {
    deleteEntity({
      endpointPath: `users/${userId}/bank_accounts/${accountId}`,
      onError: (error) => console.warn(`error: ${error}`),
      onSuccess: (responseBody) => this.loadAccounts(userId),
    });
  }
}

export default new AccountsStore();
