import React, { Component } from 'react';
// import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FormTitle from '../form-title';
import FormField from '../form-field';

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
      <div>
        <div className="row">
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
          selectField
        >
          <MenuItem value="EUR" primaryText="(€) EUR" />
          <MenuItem value="USD" primaryText="($) USD" />
          <MenuItem value="GBP" primaryText="(£) GBP" />
          <MenuItem value="CAD" primaryText="($) CAD" />
          <MenuItem value="JPY" primaryText="(¥) JPY" />
        </FormField>
        </div>
      </div>
    );
  }
}

export default UserSettingsForm;
