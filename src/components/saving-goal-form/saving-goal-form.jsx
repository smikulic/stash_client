import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import symbolFromCurrency from 'currency-symbol-map';

require('./saving-goal-form.scss');

@inject('userStore')
@withRouter
@observer
class SavingGoalForm extends Component {
  constructor(props) {
    super(props);
    
    this.userSettings = props.userStore.userSettings;

    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() + 1);
    minDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate: minDate,
      autoOk: true,
      disableYearSelection: false,
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <TextField
              fullWidth={true}
              floatingLabelText="Goal description"
              name="description"
            />
          </div>
          <div className="col-xs-6">
            <TextField
              fullWidth={true}
              floatingLabelText="Goal budget"
              name="value"
            />
            <span className="currency">{symbolFromCurrency(this.userSettings.main_currency)}</span>
          </div>
          <div className="col-xs-6">
            <DatePicker
              fullWidth={true}
              floatingLabelText="Deadline date"
              container="inline"
              autoOk={this.state.autoOk}
              minDate={this.state.minDate}
              disableYearSelection={this.state.disableYearSelection}
              hideCalendarDate
              name="deadline"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SavingGoalForm;
