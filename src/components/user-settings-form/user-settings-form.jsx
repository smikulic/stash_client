import React, { Component } from 'react';
import FormBuilder from '../form-builder';

class UserSettingsForm extends Component {
  state = {
    currencyValue: 'EUR',
    avgIncomesValue: '',
    avgExpensesValue: '',
  };

  componentWillReceiveProps(nextProps) {
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
      <FormBuilder
        title={this.props.title}
        formFields={[
          { label: 'Income', targetName: 'avgIncome', value: this.state.avgIncomesValue, onChangeEvent: this.handleChangeAvgIncomesValue },
          { label: 'Expenses', targetName: 'avgExpenses', value: this.state.avgExpensesValue, onChangeEvent: this.handleChangeAvgExpensesValue },
          {
            label: 'Currency',
            targetName: 'currency',
            value: this.state.currencyValue,
            onChangeEvent: this.handleChangeCurrency,
            type: 'select', 
            options: { USD: '($) USD', EUR: '(€) EUR', GBP: '(£) GBP', CAD: '($) CAD', JPY: '(¥) JPY' },
            defaultValue: 'USD',
          },
        ]}
      />
    );
  }
}

export default UserSettingsForm;
