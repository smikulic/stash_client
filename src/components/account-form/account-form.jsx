import React, { Component } from 'react';
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
      <React.Fragment>
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
          defaultValue="USD"
          selectField
        >
          <option value="USD">($) USD</option>
          <option value="EUR">(€) EUR</option>
          <option value="GBP">(£) GBP</option>
          <option value="CAD">($) CAD</option>
          <option value="JPY">(¥) JPY</option>
        </FormField>
        <FormField
          label="Status"
          targetName="status"
          value={this.state.statusValue}
          onChangeEvent={this.handleChangeStatus}
          selectField
          defaultValue="Primary"
        >
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
        </FormField>
      </React.Fragment>
    );
  }
}

export default AccountForm;
