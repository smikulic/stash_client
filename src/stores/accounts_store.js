import request from 'superagent';
import { apiPath } from '../config/config';
import { observable, action } from 'mobx';

export class AccountsStore {
  @observable accounts = [];

  @action loadAccounts(userId) {
    request
      .get(`${apiPath()}/api/users/${userId}/bank_accounts`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.accounts = res.body;
        }
      });
  }

  @action setAccount(userId, account) {
    request
      .post(`${apiPath()}/api/users/${userId}/bank_accounts`)
      .send(account)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.loadAccounts(userId);
        }
      });
  }

  @action updateAccount(userId, accountId, account) {
    request
      .put(`${apiPath()}/api/users/${userId}/bank_accounts/${accountId}`)
      .send(account)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.loadAccounts(userId);
        }
      });
  }

  @action removeAccount(userId, accountId) {
    request
      .delete(`${apiPath()}/api/users/${userId}/bank_accounts/${accountId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          console.warn('error!');
        } else {
          this.loadAccounts(userId);
        }
      });
  }
}

export default new AccountsStore();
