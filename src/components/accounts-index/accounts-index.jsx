import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import symbolFromCurrency from 'currency-symbol-map';
import moment from 'moment';
import accounting from 'accounting';
import { isEmpty } from 'lodash';
import {
  normalizeCreatedDate,
} from '../../helpers/utils';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import TableHeaderWrapper from '../table-header-wrapper';
import ProgressBar from '../progress-bar';
import TableActions from '../table-actions';
import SavingGoalForm from '../saving-goal-form';
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
      <div className="table-toolbar">
        <div className="table-toolbar--title">Bank Accounts</div>
        <div
          className="table-toolbar--button"
          onClick={this.props.handleAddAccount}
        >
          <i className="fa fa-plus"></i>
        </div>
      </div>

      <Table className="table">
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableHeaderWrapper columns={{'Bank name': 4, 'Balance': 3, 'Status': 2, 'Last update': 3 }} />
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            accounts && (
              accounts.map((item, index) => {
                const lastItem = accounts.length === (index + 1);
                let tableRowClass = 'table-row';

                tableRowClass += lastItem ? ' last' : '';
                
                return (
                  <TableRow key={item.id} className={tableRowClass}>
                    <TableRowColumn colSpan="4">
                      <div className="table-row--name">
                        {item.name}
                        <i
                          className="table-row--edit fa fa-pencil"
                          onClick={this.handleOnUpdateAccount.bind(this, item)}
                        />
                      </div>
                      <div className="table-row--due"><span className="circle"></span>{item.description}</div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="3">
                      <div className="table-row--value">
                      {symbolFromCurrency(item.currency)} {accounting.formatNumber(item.balance)}
                      </div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="2">
                      {/* TODO: Make status with icon and tooltip to describe */}
                      <div className="table-row--value">{item.status}</div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="3">
                      <div className="table-row--value">
                        {moment(item.updated_at, 'YYYYMMDD').subtract(1, 'hours').fromNow()}
                      </div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="1" className="table-row--actions">
                      <TableActions handleOnRemove={this.handleOnRemoveAccount.bind(this, item.id)} />
                    </TableRowColumn>
                  </TableRow>
                )
              })
            )
          }
          { isEmpty(accounts) && <EmptyAccount /> }
        </TableBody>
      </Table>

      {/* <Dialog
          modal={false}
          bodyClassName="dialog-body"
          contentStyle={customDialogStyle}
          open={this.state.accountFormActive}
          onRequestClose={this.closeAccountForm}
        >
          <form onSubmit={this.updateAccount}>
            <SavingGoalForm title="Update goal" presetValues={this.state.selectedAccount} />
            <div className="row">
              <div className="col-xs-5 col-xs-push-7">
                <FormSubmit text="Update" />
              </div>
            </div>
          </form>
        </Dialog> */}
      </span>
    );
  }
}

export default AccountsIndex;
