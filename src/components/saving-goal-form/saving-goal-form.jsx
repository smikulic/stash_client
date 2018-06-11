import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import symbolFromCurrency from 'currency-symbol-map';
import accounting from 'accounting';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FormTitle from '../form-title';
import FormField from '../form-field';
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

    const defaultSettings = props.defaultSettings;
    const descriptionValue = defaultSettings ? defaultSettings.description : 'Holiday dream house';
    const budgetValue = defaultSettings ? defaultSettings.value : '195,000';
    const deadlineValue = defaultSettings ? defaultSettings.deadline : minDate.toDateString();

    this.state = {
      disableYearSelection: false,
      descriptionValue,
      deadlineValue,
      autoOk: true,
      budgetValue,
      minDate,
    };
  }

  handleChangeDescription = (event) => this.setState({ descriptionValue: event.target.value });
  handleChangeBudget = (event) => this.setState({ budgetValue: event.target.value });

  render() {
    return (
      <div>
        <div className="col-xs-12">
          <FormTitle title={this.props.title} />
          <FormField
            label="Goal Description"
            targetName="description"
            value={this.state.descriptionValue}
            onChangeEvent={this.handleChangeDescription}
          />
          <FormField
            label="Goal Budget"
            targetName="budget"
            value={this.state.budgetValue}
            onChangeEvent={this.handleChangeBudget}
          >
            <span className="currency">{symbolFromCurrency(this.userSettings.main_currency)}</span>
          </FormField>
          <div className="row">
            <div className="col-xs-8 col-xs-push-2">
              <DatePicker
                fullWidth={true}
                floatingLabelText="Deadline Date"
                floatingLabelFixed={true}
                container="inline"
                autoOk={this.state.autoOk}
                minDate={this.state.minDate}
                disableYearSelection={this.state.disableYearSelection}
                hideCalendarDate
                hintText={this.state.deadlineValue}
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
