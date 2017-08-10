import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

class SavingGoalForm extends Component {
  constructor(props) {
    super(props);

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
            />
          </div>
          <div className="col-xs-12">
            <TextField
              fullWidth={true}
              floatingLabelText="Goal value (estimated)"
            />
          </div>
          <div className="col-xs-12">
            <DatePicker
              fullWidth={true}
              floatingLabelText="Date (select month for deadline)"
              container="inline"
              autoOk={this.state.autoOk}
              minDate={this.state.minDate}
              disableYearSelection={this.state.disableYearSelection}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SavingGoalForm;
