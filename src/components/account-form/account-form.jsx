import React, { Component } from 'react';
import accounting from 'accounting';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import FormTitle from '../form-title';
import FormField from '../form-field';

require('./account-form.scss');

class AccountForm extends Component {
  state = {
    descriptionValue: '',
    currencyValue: 'EUR',
    balanceValue: '',
    statusValue: 'Primary',
    nameValue: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      descriptionValue: nextProps.defaultSettings.description,
      currencyValue: nextProps.defaultSettings.currency,
      balanceValue: nextProps.defaultSettings.balance,
      statusValue: nextProps.defaultSettings.status,
      nameValue: nextProps.defaultSettings.name,
    });
  }

  handleChangeDescription = (event, index, descriptionValue) => this.setState({ descriptionValue });
  handleChangeCurrency = (event, index, currencyValue) => this.setState({ currencyValue });
  handleChangeBalance = (event, index, balanceValue) => this.setState({ balanceValue });
  handleChangeStatus = (event, index, statusValue) => this.setState({ statusValue });
  handleChangeName = (event, index, nameValue) => this.setState({ nameValue });

  render() {
    return (
      <div>
        <div className="col-xs-12">
          <FormTitle title={this.props.title} />
          <FormField
            label="Bank Name"
            targetName="name"
            value={this.state.nameValue}
            onChangeEvent={this.handleChangeName}
          />
          <FormField
            label="Description"
            targetName="description"
            value={this.state.descriptionValue}
            onChangeEvent={this.handleChangeDescription}
          />
          <FormField
            label="Balance"
            targetName="balance"
            value={this.state.balanceValue}
            onChangeEvent={this.handleChangeBalance}
          />
          <FormField
            label="Currency"
            targetName="currency"
            value={this.state.currencyValue}
            onChangeEvent={this.handleChangeCurrency}
            selectField
          >
            <MenuItem value="EUR" primaryText="(€) EUR" />
            <MenuItem value="USD" primaryText="($) USD" />
            <MenuItem value="GBP" primaryText="(£) GBP" />
            <MenuItem value="CAD" primaryText="($) CAD" />
            <MenuItem value="JPY" primaryText="(¥) JPY" />
          </FormField>
          <FormField
            label="Status"
            targetName="status"
            value={this.state.statusValue}
            onChangeEvent={this.handleChangeStatus}
            selectField
          >
            <MenuItem value="Primary" primaryText="Primary" />
            <MenuItem value="Secondary" primaryText="Secondary" />
          </FormField>
        </div>
      </div>
    );
  }
}

export default AccountForm;
