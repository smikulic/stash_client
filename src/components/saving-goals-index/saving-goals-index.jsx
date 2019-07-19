import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import symbolFromCurrency from 'currency-symbol-map';
import accounting from 'accounting';
import { isEmpty } from 'lodash';
import {
  sanitizeValue,
  deadlineInPast,
  normalizeCreatedDate,
  normalizeDeadlineDate,
  monthlyValue,
  savedUntilNowValue,
  dueDateMessage,
} from '../../helpers/utils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableToolbarWrapper from '../table-toolbar-wrapper';
import TableHeaderWrapper from '../table-header-wrapper';
import TableRowWrapper from '../table-row-wrapper';
import DialogWrapper from '../dialog-wrapper';
import SavingGoalForm from '../../components/saving-goal-form';
import EmptySavingGoal from '../empty-saving-goal';

@inject('savingGoalsStore', 'userStore')
@withRouter
@observer
class SavingGoalsIndex extends Component {
  constructor(props) {
    super(props);
    this.updateSavingGoal = this.updateSavingGoal.bind(this);
    this.userId = props.userStore.userData.id;

    this.state = {
      savingGoalFormActive: false,
      selectedSavingGoal: {},
    };
  }

  componentWillMount() {
    this.props.savingGoalsStore.loadSavingGoals(this.userId);
  }

  closeSavingGoalForm = () => {
    this.setState({ savingGoalFormActive: false });
  };

  handleOnRemoveSavingGoal(savingGoalId) {
    this.props.savingGoalsStore.removeSavingGoal(this.userId, savingGoalId);
  }

  handleOnUpdateSavingGoal(savingGoal) {
    this.setState({
      savingGoalFormActive: true,
      selectedSavingGoal: savingGoal,
    });
  }

  updateSavingGoal(e) {
    e.preventDefault();
    const savingGoal = {
      description: e.target['description'].value,
      deadline: e.target['deadline'].value,
      value: sanitizeValue(e.target['budget'].value),
    };
    if (savingGoal.deadline || savingGoal.description || savingGoal.value) {
      this.props.savingGoalsStore.updateSavingGoal(this.userId, this.state.selectedSavingGoal.id, savingGoal);
    }

    this.closeSavingGoalForm();
  };

  render() {
    const { savingGoals } = this.props.savingGoalsStore;
    const currency = this.props.userStore.userSettings ?
    symbolFromCurrency(this.props.userStore.userSettings.main_currency) :
    null;

    return (
      <span>
      <TableToolbarWrapper title="Saving Goals" onPlusClick={this.props.handleAddSavingGoal} />
      <Table className="table">
        <TableHead>
          <TableHeaderWrapper columns={{'Goal': 4, 'Goal progress': 4, 'Total budget': 2, 'Each month': 2 }} />
        </TableHead>
        <TableBody>
          {
            savingGoals && (
              savingGoals.map((item, index) => {
                // reset created time to the start of the day for accurate calculation
                let normalizedCreatedAt = normalizeCreatedDate(item.created_at);
                let normalizedDeadline = normalizeDeadlineDate(item.deadline);
                // calculate amount to save per month
                const monthly = monthlyValue(normalizedDeadline, normalizedCreatedAt, item.value);
                // calculate how much per goal have you saved so far
                const saved = savedUntilNowValue(normalizedCreatedAt, monthly, item.value);
                
                return (
                  <TableRowWrapper
                    key={item.id}
                    lastItem={savingGoals.length === (index + 1)}
                    inactive={deadlineInPast(normalizedDeadline)}
                    columns={[
                      {
                        type: 'name',
                        value: item.description,
                        size: 4,
                        onEditClick: this.handleOnUpdateSavingGoal.bind(this, item),
                        extraInfo: dueDateMessage(normalizedDeadline),
                      },
                      {
                        type: 'progress',
                        value: saved,
                        size: 4,
                      },
                      {
                        type: 'default',
                        value: `${currency} ${accounting.formatNumber(item.value)}`,
                        size: 2,
                      },
                      {
                        type: 'default',
                        value: `${currency} ${accounting.formatNumber(monthly)}`,
                        size: 2,
                      },
                    ]}
                    onRemoveClick={this.handleOnRemoveSavingGoal.bind(this, item.id)}
                  />
                )
              })
            )
          }
          { isEmpty(savingGoals) && <EmptySavingGoal currency={currency} /> }
        </TableBody>
      </Table>
      <DialogWrapper
        open={this.state.savingGoalFormActive}
        onRequestClose={this.closeSavingGoalForm}
        onSubmit={this.updateSavingGoal}
        submitText="Update"
      >
        <SavingGoalForm title="Update goal" defaultSettings={this.state.selectedSavingGoal} />
      </DialogWrapper>
      </span>
    );
  }
}

export default SavingGoalsIndex;
