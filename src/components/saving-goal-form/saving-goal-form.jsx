import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import symbolFromCurrency from 'currency-symbol-map';
import accounting from 'accounting';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FormTitle from '../form-title';

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
      presetValues: props.presetValues || false,
    };
  }

  render() {
    return (
      <div>
        <div className="col-xs-12">
          <FormTitle title={this.props.title} />
          <div className="row">
            <div className="col-xs-8 col-xs-push-2">
              <TextField
                fullWidth={true}
                hintText={this.state.presetValues.description || 'Holiday dream house'}
                floatingLabelText="Goal description"
                floatingLabelFixed={true}
                name="description"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-5 col-xs-push-2">
              <TextField
                fullWidth={true}
                hintText={accounting.formatNumber(this.state.presetValues.value || '195,000')}
                floatingLabelText="Goal budget"
                floatingLabelFixed={true}
                name="value"
              />
              <span className="currency">{symbolFromCurrency(this.userSettings.main_currency)}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-5 col-xs-push-2">
              <DatePicker
                fullWidth={true}
                floatingLabelText="Deadline date"
                floatingLabelFixed={true}
                container="inline"
                autoOk={this.state.autoOk}
                minDate={this.state.minDate}
                disableYearSelection={this.state.disableYearSelection}
                hideCalendarDate
                hintText={this.state.presetValues.deadline || ''}
                name="deadline"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SavingGoalForm;
