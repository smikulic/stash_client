import React, { Component } from 'react';
import { getCurrencyField } from '../../helpers/form-utils';
import FormBuilder from '../form-builder';
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
      <FormBuilder
        title={this.props.title}
        formFields={[
          { label: 'Bank Name', targetName: 'name', value: this.state.nameValue, onChangeEvent: this.handleChangeName },
          { label: 'Description', targetName: 'description', value: this.state.descriptionValue, onChangeEvent: this.handleChangeDescription },
          { label: 'Balance', targetName: 'balance', value: this.state.balanceValue, onChangeEvent: this.handleChangeBalance },
          getCurrencyField(this.state.currencyValue, this.handleChangeCurrency),
          { 
            label: 'Status',
            targetName: 'status',
            value: this.state.statusValue,
            onChangeEvent: this.handleChangeStatus,
            type: 'select',
            options: { Primary: 'Primary', Secondary: 'Secondary' },
            defaultValue: 'Primary',
          },
        ]}
      />
    );
  }
}

export default AccountForm;
