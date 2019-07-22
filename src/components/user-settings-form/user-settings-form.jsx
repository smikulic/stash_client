import React, { Component } from 'react';
import FormTitle from '../form-title';
import FormField from '../form-field';

class UserSettingsForm extends Component {
  state = {
    currencyValue: 'EUR',
    avgIncomesValue: '',
    avgExpensesValue: '',
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.defaultSettings.average_monthly_expenses)
    this.setState({
      currencyValue: nextProps.defaultSettings.main_currency,
      avgIncomesValue: nextProps.defaultSettings.average_monthly_incomes,
      avgExpensesValue: nextProps.defaultSettings.average_monthly_expenses,
    });
  }

  handleChangeCurrency = (event, index, currencyValue) => this.setState({ currencyValue });
  handleChangeAvgIncomesValue = (event) => this.setState({ avgIncomesValue: event.target.value });
  handleChangeAvgExpensesValue = (event) => this.setState({ avgExpensesValue: event.target.value });

  render() {
    return (
      <React.Fragment>
        <FormTitle title={this.props.title} />
        <FormField
          label="Income"
          targetName="avgIncome"
          value={this.state.avgIncomesValue}
          onChangeEvent={this.handleChangeAvgIncomesValue}
        />
        <FormField
          label="Expenses"
          targetName="avgExpenses"
          value={this.state.avgExpensesValue}
          onChangeEvent={this.handleChangeAvgExpensesValue}
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
      </React.Fragment>
    );
  }
}

export default UserSettingsForm;
