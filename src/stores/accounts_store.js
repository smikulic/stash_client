import { observable, action } from 'mobx';
import amplitude from 'amplitude-js/amplitude';
import { handleRequest } from '../helpers/api';

export class AccountsStore {
  @observable accounts = [];

  @action loadAccounts(userId, sortByQuery) {
    const sortQuery = sortByQuery || '';
    handleRequest({
      method: 'GET',
      endpointPath: `users/${userId}/bank_accounts${sortQuery}`,
      onSuccess: (responseBody) => this.accounts = responseBody,
    });
  }

  @action setAccount(userId, account) {
    amplitude.getInstance().logEvent('CREATED Account');
    handleRequest({
      method: 'POST',
      endpointPath: `users/${userId}/bank_accounts`,
      data: account,
      onSuccess: () => this.loadAccounts(userId),
    });
  }

  @action updateAccount(userId, accountId, account) {
    amplitude.getInstance().logEvent('UPDATED Account');
    handleRequest({
      method: 'PUT',
      endpointPath: `users/${userId}/bank_accounts/${accountId}`,
      data: account,
      onSuccess: () => this.loadAccounts(userId),
    });
  }

  @action removeAccount(userId, accountId) {
    amplitude.getInstance().logEvent('REMOVED Account');
    handleRequest({
      method: 'DELETE',
      endpointPath: `users/${userId}/bank_accounts/${accountId}`,
      onSuccess: () => this.loadAccounts(userId),
    });
  }
}

export default new AccountsStore();
