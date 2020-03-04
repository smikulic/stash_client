import React, { Component } from 'react';
import { getCurrencyField } from '../../helpers/form-utils';
import FormBuilder from '../form-builder';

class UserSettingsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencyValue: props.defaultSettings ? props.defaultSettings.main_currency : 'EUR',
      avgIncomesValue: props.defaultSettings? props.defaultSettings.average_monthly_incomes : '',
      avgExpensesValue: props.defaultSettings ? props.defaultSettings.average_monthly_expenses : '',
    };
  }

  handleChangeCurrency = (event, index, currencyValue) => this.setState({ currencyValue });
  handleChangeAvgIncomesValue = (event) => this.setState({ avgIncomesValue: event.target.value });
  handleChangeAvgExpensesValue = (event) => this.setState({ avgExpensesValue: event.target.value });

  render() {
    return (
      <FormBuilder
        title={this.props.title}
        formFields={[
          { label: 'Income', targetName: 'avgIncome', value: this.state.avgIncomesValue, onChangeEvent: this.handleChangeAvgIncomesValue },
          { label: 'Expenses', targetName: 'avgExpenses', value: this.state.avgExpensesValue, onChangeEvent: this.handleChangeAvgExpensesValue },
          getCurrencyField(this.state.currencyValue, this.handleChangeCurrency),
        ]}
      />
    );
  }
}

export default UserSettingsForm;
