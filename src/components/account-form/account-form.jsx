import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormTitle from '../form-title';
import FormField from '../form-field';
require('./account-form.scss');

class AccountForm extends Component {
  constructor(props) {
    super(props);

    const defaultSettings = props.defaultSettings;
    const descriptionValue = defaultSettings ? defaultSettings.description : '';
    const currencyValue = defaultSettings ? defaultSettings.currency : 'EUR';
    const balanceValue = defaultSettings ? defaultSettings.balance : '';
    const statusValue = defaultSettings ? defaultSettings.status : 'Primary';
    const nameValue = defaultSettings ? defaultSettings.name : '';

    this.state = {
      descriptionValue,
      currencyValue,
      balanceValue,
      statusValue,
      nameValue,
    };
  }

  handleChangeDescription = (event) => this.setState({ descriptionValue: event.target.value });
  handleChangeBalance = (event) => this.setState({ balanceValue: event.target.value });
  handleChangeName = (event) => this.setState({ nameValue: event.target.value });

  handleChangeCurrency = (event, index, currencyValue) => this.setState({ currencyValue });
  handleChangeStatus = (event, index, statusValue) => this.setState({ statusValue });

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
