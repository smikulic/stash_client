import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import FormBuilder from '../form-builder';
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
    const descriptionValue = defaultSettings ? defaultSettings.description : '';
    const budgetValue = defaultSettings ? defaultSettings.value : '';
    const deadlineValue = defaultSettings ? defaultSettings.deadline : minDate;

    this.state = {
      descriptionValue,
      deadlineValue,
      budgetValue,
    };
  }

  handleChangeDescription = (event) => this.setState({ descriptionValue: event.target.value });
  handleChangeBudget = (event) => this.setState({ budgetValue: event.target.value });
  handleChangeDeadline = (event) => this.setState({ deadlineValue: event.target.value });

  render() {
    return (
      <FormBuilder
        title={this.props.title}
        formFields={[
          { label: 'Goal Description', targetName: 'description', value: this.state.descriptionValue, onChangeEvent: this.handleChangeDescription },
          { label: 'Goal Budget', targetName: 'budget', value: this.state.budgetValue, onChangeEvent: this.handleChangeBudget },
          { label: 'Deadline Date', targetName: 'deadline', value: this.state.deadlineValue, onChangeEvent: this.handleChangeDeadline, type: 'date' },
        ]}
      />
    );
  }
}

export default SavingGoalForm;
