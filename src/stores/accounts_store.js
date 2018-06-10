import request from 'superagent';
import { apiPath } from '../config/config';
import { observable, action } from 'mobx';
import { handleRequest } from '../helpers/api';

export class AccountsStore {
  @observable accounts = [];

  @action loadAccounts(userId) {
    handleRequest({
      method: 'GET',
      endpointPath: `users/${userId}/bank_accounts`,
      onSuccess: (responseBody) => this.accounts = responseBody,
    });
  }

  @action setAccount(userId, account) {
    handleRequest({
      method: 'POST',
      endpointPath: `users/${userId}/bank_accounts`,
      data: account,
      onSuccess: (responseBody) => this.loadAccounts(userId),
    });
  }

  @action updateAccount(userId, accountId, account) {
    handleRequest({
      method: 'PUT',
      endpointPath: `users/${userId}/bank_accounts/${accountId}`,
      data: account,
      onSuccess: (responseBody) => this.loadAccounts(userId),
    });
  }

  @action removeAccount(userId, accountId) {
    handleRequest({
      method: 'DELETE',
      endpointPath: `users/${userId}/bank_accounts/${accountId}`,
      onSuccess: (responseBody) => this.loadAccounts(userId),
    });
  }
}

export default new AccountsStore();
