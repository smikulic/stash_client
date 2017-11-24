import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
        { this.props.title && (
            <div className="row">
              <div className="col-xs-8 col-xs-push-2">
                <div className="saving-goal-form--title-wrapper">
                  <div className="saving-goal-form--title">
                    {this.props.title}
                    </div>
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-xs-8 col-xs-push-2">
              <TextField
                fullWidth={true}
                floatingLabelText="Income"
                name="avgIncome"
                value={this.state.avgIncomesValue}
                onChange={this.handleChangeAvgIncomesValue}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-8 col-xs-push-2">
              <TextField
                fullWidth={true}
                floatingLabelText="Expenses"
                name="avgExpenses"
                value={this.state.avgExpensesValue}
                onChange={this.handleChangeAvgExpensesValue}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-8 col-xs-push-2">
              <SelectField
                floatingLabelText="Currency"
                fullWidth={true}
                value={this.state.currencyValue}
                onChange={this.handleChangeCurrency}
              >
                <MenuItem value="EUR" primaryText="(€) EUR" />
                <MenuItem value="USD" primaryText="($) USD" />
                <MenuItem value="GBP" primaryText="(£) GBP" />
              </SelectField>
              <input name="currency" type="hidden" value={this.state.currencyValue} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSettingsForm;
