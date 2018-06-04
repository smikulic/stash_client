import React, { Component } from 'react';
import symbolFromCurrency from 'currency-symbol-map';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import Paper from 'material-ui/Paper';
// import SavingGoalsIndex from '../../components/saving-goals-index';

require('./accounts-page.scss');

const customDialogStyle = {
  position: 'absolute',
  top: '5%',
  width: '50%',
  maxWidth: 'none',
  transform: 'translate(50%, 64px)',
};

// @inject('accountsStore', 'userStore')
@inject('userStore')
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
    const value = sanitizeValue(e.target['value'].value);
    const account = {
      // description: e.target['description'].value,
      // deadline: e.target['deadline'].value,
      value: value,
    };

    this.props.accountsStore.setAccount(this.userId, account);
    this.closeAccountForm();
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <Paper className="account-item" zDepth={1}>
              {/* <AccountIndex
                userData={this.props.userStore.userSettings}
                handleAddAccount={this.openAccountForm}
              /> */}
            </Paper>
          </div>
        </div>

        {/* <Dialog
          modal={false}
          bodyClassName="dialog-body"
          contentStyle={customDialogStyle}
          open={this.state.accountFormActive}
          onRequestClose={this.closeAccountForm}
        >
          <form onSubmit={this.submitAccountForm}>
            <SavingGoalForm title="Create new goal" />
            <div className="row">
              <div className="col-xs-5 col-xs-push-7">
                <FormSubmit text="Create" />
              </div>
            </div>
          </form>
        </Dialog> */}
      </div>
    )
  }
};

export default AccountsPage;
