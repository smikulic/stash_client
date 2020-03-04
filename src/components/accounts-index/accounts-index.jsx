import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import symbolFromCurrency from 'currency-symbol-map';
import moment from 'moment';
import accounting from 'accounting';
import { isEmpty } from 'lodash';
import { sanitizeValue, buildSortQuery } from '../../helpers/utils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableToolbarWrapper from '../table-toolbar-wrapper';
import TableHeaderWrapper from '../table-header-wrapper';
import TableRowWrapper from '../table-row-wrapper';
import DialogWrapper from '../dialog-wrapper';
import AccountForm from '../account-form';


@inject('accountsStore', 'userStore')
@withRouter
@observer
class AccountsIndex extends Component {
  constructor(props) {
    super(props);
    this.updateAccount = this.updateAccount.bind(this);
    this.handleSortAction = this.handleSortAction.bind(this);
    this.userId = props.userStore.userData.id;

    this.state = {
      accountFormActive: false,
      selectedAccount: {},
      sortedBy: { columnName: '', direction: '' },
    };
  }

  componentWillMount() {
    this.props.accountsStore.loadAccounts(this.userId);
  }

  closeAccountForm = () => {
    this.setState({ accountFormActive: false });
  };

  handleSortAction(columnName, currentDirection) {
    const { sortQuery, sortedBy } = buildSortQuery(columnName, currentDirection);
    this.props.accountsStore.loadAccounts(this.userId, sortQuery);
    this.setState({ sortedBy: sortedBy });
  }

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
    const account = {
      description: e.target['description'].value,
      currency: e.target['currency'].value,
      status: e.target['status'].value,
      name: e.target['name'].value,
      balance: sanitizeValue(e.target['balance'].value),
    };
    if (account.balance && account.name && account.currency && account.status) {
      this.props.accountsStore.updateAccount(this.userId, this.state.selectedAccount.id, account);
    }

    this.closeAccountForm();
  };

  render() {
    const { accounts } = this.props.accountsStore;
    const { sortedBy } = this.state;

    return (
      <React.Fragment>
        <TableToolbarWrapper title="Bank Accounts" onPlusClick={this.props.handleAddAccount} />
        <Table className="table">
          <TableHeaderWrapper
            columns={{
              'Bank name': { span: 5 },
              'Balance': { span: 3 },
              'Status': { span: 2 },
              'Last update': { span: 3 },
            }}
            sortedBy={sortedBy}
            handleSortAction={this.handleSortAction}
          />
          <TableBody>
            {
              accounts && (
                accounts.map((item, index) => (
                  <TableRowWrapper
                    key={item.id}
                    lastItem={accounts.length === (index + 1)}
                    columns={[
                      {
                        type: 'name',
                        value: item.name,
                        size: 5,
                        onEditClick: this.handleOnUpdateAccount.bind(this, item),
                        onRemoveClick: this.handleOnRemoveAccount.bind(this, item.id),
                        extraInfo: item.description,
                      },
                      {
                        type: 'default',
                        value: `${symbolFromCurrency(item.currency)} ${accounting.formatNumber(item.balance)}`,
                        size: 3,
                      },
                      {
                        type: 'default',
                        // TODO: Make status with icon and tooltip to describe
                        value: item.status,
                        size: 2,
                      },
                      {
                        type: 'default',
                        value: moment(item.updated_at).fromNow(),
                        size: 3,
                      },
                    ]}
                  />
                ))
              )
            }
            { isEmpty(accounts) && (
              <TableRowWrapper
                placeholderExample={true}
                lastItem={true}
                columns={[
                  { type: 'name', value: 'Wells Fargo', size: 5, extraInfo: 'US Savings account' },
                  { type: 'default', value: '$12,000', size: 3 },
                  { type: 'default', value: 'Primary', size: 2 },
                  { type: 'default', value: moment('20190603', 'YYYYMMDD').fromNow(), size: 3 },
                ]}
              />
            )}
          </TableBody>
        </Table>
        <DialogWrapper
          open={this.state.accountFormActive}
          onRequestClose={this.closeAccountForm}
          onSubmit={this.updateAccount}
          submitText="Update"
        >
          <AccountForm title="Update account" defaultSettings={this.state.selectedAccount} />
        </DialogWrapper>
      </React.Fragment>
    );
  }
}

export default AccountsIndex;
