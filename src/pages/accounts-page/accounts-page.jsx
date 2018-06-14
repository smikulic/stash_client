import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import amplitude from 'amplitude-js/amplitude';
import { sanitizeValue } from '../../helpers/utils';
import PageItemWrapper from '../../components/page-item-wrapper';
import DialogWrapper from '../../components/dialog-wrapper';
import AccountsIndex from '../../components/accounts-index';
import AccountForm from '../../components/account-form';

@inject('accountsStore', 'userStore')
@withRouter
@observer
class AccountsPage extends Component {
  constructor(props) {
    super(props);
    amplitude.getInstance().logEvent('Page load: Account Index');

    this.openAccountForm = this.openAccountForm.bind(this);
    this.submitAccountForm = this.submitAccountForm.bind(this);
    this.userId = props.userStore.userData.id;

    this.state = { accountFormActive: false };
  }

  componentWillMount() {
    this.props.userStore.loadUserSettings(this.userId);
  }

  openAccountForm = () => {
    this.setState({ accountFormActive: true });
  };

  closeAccountForm = () => {
    this.setState({ accountFormActive: false });
  };

  submitAccountForm (e) {
    e.preventDefault();
    const account = {
      description: e.target['description'].value,
      currency: e.target['currency'].value,
      status: e.target['status'].value,
      name: e.target['name'].value,
      balance: sanitizeValue(e.target['balance'].value),
    };
    if (account.balance && account.name && account.currency && account.status) {
      this.props.accountsStore.setAccount(this.userId, account);
    }

    this.closeAccountForm();
  };

  render() {
    return (
      <div className="container-fluid">
        <PageItemWrapper>
          <AccountsIndex
            userData={this.props.userStore.userSettings}
            handleAddAccount={this.openAccountForm}
          />
        </PageItemWrapper>
        <DialogWrapper
          open={this.state.accountFormActive}
          onRequestClose={this.closeAccountForm}
          onSubmit={this.submitAccountForm}
          submitText="Add"
        >
          <AccountForm title="Add bank account" />
        </DialogWrapper>
      </div>
    )
  }
};

export default AccountsPage;
