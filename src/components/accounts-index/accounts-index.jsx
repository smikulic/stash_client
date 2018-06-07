import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import symbolFromCurrency from 'currency-symbol-map';
import moment from 'moment';
import accounting from 'accounting';
import { isEmpty } from 'lodash';
import { normalizeCreatedDate } from '../../helpers/utils';
import {
  Table,
  TableBody,
  TableHeader,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import TableToolbarWrapper from '../table-toolbar-wrapper';
import TableHeaderWrapper from '../table-header-wrapper';
import TableRowWrapper from '../table-row-wrapper';
import ProgressBar from '../progress-bar';
import TableActions from '../table-actions';
import AccountForm from '../account-form';
import FormSubmit from '../form-submit';
import EmptyAccount from '../empty-account';

require('./accounts-index.scss');

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
class AccountsIndex extends Component {
  constructor(props) {
    super(props);
    this.updateAccount = this.updateAccount.bind(this);
    this.userId = props.userStore.userData.id;

    this.state = {
      accountFormActive: false,
      selectedAccount: {},
    };
  }

  componentWillMount() {
    this.props.accountsStore.loadAccounts(this.userId);
  }

  closeAccountForm = () => {
    this.setState({ accountFormActive: false });
  };

  handleOnRemoveAccount(accountlId) {
    this.props.accountsStore.removeAccount(this.userId, accountlId);
  }

  handleOnUpdateAccount(account) {
    this.setState({
      accountFormActive: true,
      selectedAccount: account,
    });
  }

  updateAccount(e) {
    e.preventDefault();
    const value = sanitizeValue(e.target['value'].value);
    const account = {
      // description: e.target['description'].value,
      // deadline: e.target['deadline'].value,
      value: value,
    };
    if (account.value) {
      //console.log(this.userId, this.state.selectedAccount.id, account);
      this.props.accountsStore.updateAccount(this.userId, this.state.selectedAccount.id, account);
    }

    this.closeAccountForm();
  };

  render() {
    const { accounts } = this.props.accountsStore;
    const currency = this.props.userStore.userSettings ?
    symbolFromCurrency(this.props.userStore.userSettings.main_currency) :
    null;

    return (
      <span>
      <TableToolbarWrapper title="Bank Accounts" onPlusClick={this.props.handleAddAccount} />
      <Table className="table">
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableHeaderWrapper columns={{'Bank name': 4, 'Balance': 3, 'Status': 2, 'Last update': 3 }} />
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            accounts && (
              accounts.map((item, index) => {
                const lastItem = accounts.length === (index + 1);
                const itemId = item.id;
                
                return (
                  <TableRowWrapper
                    key={itemId}
                    lastItem={lastItem}
                    columns={[
                      {
                        type: 'name',
                        value: item.name,
                        size: 4,
                        onEditClick: this.handleOnUpdateAccount.bind(this, item),
                        extraInfo: item.description,
                      },
                      {
                        type: 'default',
                        value: `${symbolFromCurrency(item.currency)} ${accounting.formatNumber(item.balance)}`,
                        size: 3,
                      },
                      {
                        type: 'default',
                        /* TODO: Make status with icon and tooltip to describe */
                        value: item.status,
                        size: 2,
                      },
                      {
                        type: 'default',
                        value: moment(item.updated_at, 'YYYYMMDD').subtract(1, 'hours').fromNow(),
                        size: 3,
                      },
                    ]}
                    onRemoveClick={this.handleOnRemoveAccount.bind(this, itemId)}
                  />
                )
              })
            )
          }
          { isEmpty(accounts) && <EmptyAccount /> }
        </TableBody>
      </Table>

      <Dialog
          modal={false}
          bodyClassName="dialog-body"
          contentStyle={customDialogStyle}
          open={this.state.accountFormActive}
          onRequestClose={this.closeAccountForm}
        >
          <form onSubmit={this.updateAccount}>
            <AccountForm title="Update account" presetValues={this.state.selectedAccount} />
            <div className="row">
              <div className="col-xs-5 col-xs-push-7">
                <FormSubmit text="Update" />
              </div>
            </div>
          </form>
        </Dialog>
      </span>
    );
  }
}

export default AccountsIndex;
