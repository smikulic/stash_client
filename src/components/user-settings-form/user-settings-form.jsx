import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class UserSettingsForm extends Component {
  state = { value: 'EUR' };

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    return (
      <div>
        <div className="row">
          <p>Enter average monthly values</p>
          <div className="col-xs-6">
            <TextField
              fullWidth={true}
              floatingLabelText="Income"
              name="avgIncome"
            />
          </div>
          <div className="col-xs-6">
            <TextField
              fullWidth={true}
              floatingLabelText="Expenses"
              name="avgExpenses"
            />
          </div>
          <div className="col-xs-6">
            <SelectField
              floatingLabelText="Currency"
              fullWidth={true}
              value="EUR"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <MenuItem value="EUR" primaryText="(€) EUR" />
              <MenuItem value="USD" primaryText="($) USD" />
              <MenuItem value="GBP" primaryText="(£) GBP" />
            </SelectField>
            <input name="currency" type="hidden" value={this.state.value} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserSettingsForm;
