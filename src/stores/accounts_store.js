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
    // amplitude.getInstance().logEvent('CREATE ACCOUNT');
    handleRequest({
      method: 'POST',
      endpointPath: `users/${userId}/bank_accounts`,
      data: account,
      onSuccess: (responseBody) => this.loadAccounts(userId),
    });
  }

  @action updateAccount(userId, accountId, account) {
    // amplitude.getInstance().logEvent('UPDATE ACCOUNT');
    handleRequest({
      method: 'PUT',
      endpointPath: `users/${userId}/bank_accounts/${accountId}`,
      data: account,
      onSuccess: (responseBody) => this.loadAccounts(userId),
    });
  }

  @action removeAccount(userId, accountId) {
    // amplitude.getInstance().logEvent('REMOVE ACCOUNT');
    handleRequest({
      method: 'DELETE',
      endpointPath: `users/${userId}/bank_accounts/${accountId}`,
      onSuccess: (responseBody) => this.loadAccounts(userId),
    });
  }
}

export default new AccountsStore();
