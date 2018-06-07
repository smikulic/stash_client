import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import symbolFromCurrency from 'currency-symbol-map';
import accounting from 'accounting';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FormTitle from '../form-title';

require('./account-form.scss');

@inject('userStore')
@withRouter
@observer
class AccountForm extends Component {
  constructor(props) {
    super(props);
    
    this.userSettings = props.userStore.userSettings;
  }

  render() {
    return (
      <div>
        <div className="col-xs-12">
          <FormTitle title={this.props.title} />
          <div className="row">
            <div className="col-xs-8 col-xs-push-2">
              <TextField
                fullWidth={true}
                hintText={this.state.presetValues.name || 'Wells Fargo'}
                floatingLabelText="Bank name"
                floatingLabelFixed={true}
                name="name"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-5 col-xs-push-2">
              <TextField
                fullWidth={true}
                hintText={accounting.formatNumber(this.state.presetValues.balance || '12,000')}
                floatingLabelText="Account balance"
                floatingLabelFixed={true}
                name="balance"
              />
              <span className="currency">{symbolFromCurrency(this.userSettings.main_currency)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountForm;
