import React, { Component } from 'react';
import symbolFromCurrency from 'currency-symbol-map';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { sanitizeValue } from '../../helpers/utils';
import Dialog from 'material-ui/Dialog';
import PageItemWrapper from '../../components/page-item-wrapper';
import AccountsIndex from '../../components/accounts-index';
import AccountForm from '../../components/account-form';
import FormSubmit from '../../components/form-submit';

require('./accounts-page.scss');

const customDialogStyle = {
  position: 'absolute',
  top: '5%',
  width: '50%',
  maxWidth: 'none',
  transform: 'translate(50%, 64px)',
};

@inject('accountsStore', 'userStore')
@withRouter
@observer
class AccountsPage extends Component {
  constructor(props) {
    super(props);
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
    const balance = sanitizeValue(e.target['balance'].value);
    const account = {
      description: e.target['description'].value,
      currency: e.target['currency'].value,
      status: e.target['status'].value,
      name: e.target['name'].value,
      balance: balance,
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

        <Dialog
          modal={false}
          bodyClassName="dialog-body"
          contentStyle={customDialogStyle}
          open={this.state.accountFormActive}
          onRequestClose={this.closeAccountForm}
        >
          <form onSubmit={this.submitAccountForm}>
            <AccountForm title="Add bank account" />
            <div className="row">
              <div className="col-xs-5 col-xs-push-7">
                <FormSubmit text="Add" />
              </div>
            </div>
          </form>
        </Dialog>
      </div>
    )
  }
};

export default AccountsPage;
