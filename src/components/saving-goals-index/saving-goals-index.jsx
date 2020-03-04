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
  buildSortQuery,
} from '../../helpers/utils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableToolbarWrapper from '../table-toolbar-wrapper';
import TableHeaderWrapper from '../table-header-wrapper';
import TableRowWrapper from '../table-row-wrapper';
import DialogWrapper from '../dialog-wrapper';
import SavingGoalForm from '../../components/saving-goal-form';


@inject('savingGoalsStore', 'userStore')
@withRouter
@observer
class SavingGoalsIndex extends Component {
  constructor(props) {
    super(props);
    this.updateSavingGoal = this.updateSavingGoal.bind(this);
    this.handleSortAction = this.handleSortAction.bind(this);
    this.userId = props.userStore.userData.id;

    this.state = {
      savingGoalFormActive: false,
      selectedSavingGoal: {},
      sortedBy: { columnName: '', direction: '' },
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

  handleSortAction(columnName, currentDirection) {
    const { sortQuery, sortedBy } = buildSortQuery(columnName, currentDirection);
    this.props.savingGoalsStore.loadSavingGoals(this.userId, sortQuery);
    this.setState({ sortedBy: sortedBy });
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
    const { savingGoalsStore, userStore, handleAddSavingGoal } = this.props;
    const { sortedBy, savingGoalFormActive, selectedSavingGoal } = this.state;
    const { savingGoals } = savingGoalsStore;
    const currency = userStore.userSettings ? symbolFromCurrency(userStore.userSettings.main_currency) : null;

    return (
      <React.Fragment>
        <TableToolbarWrapper title="Saving Goals" onPlusClick={handleAddSavingGoal} />
        <Table className="table">
          <TableHeaderWrapper
            columns={{
              'Goal': { span: 2 },
              'Goal progress': { span: 4 },
              'Total budget': { span: 1 },
              'Each month': { span: 1, sort: false },
            }}
            sortedBy={sortedBy}
            handleSortAction={this.handleSortAction}
          />
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
                          size: 2,
                          onEditClick: this.handleOnUpdateSavingGoal.bind(this, item),
                          onRemoveClick: this.handleOnRemoveSavingGoal.bind(this, item.id),
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
                          size: 1,
                        },
                        {
                          type: 'default',
                          value: `${currency} ${accounting.formatNumber(monthly)}`,
                          size: 1,
                        },
                      ]}
                    />
                  )
                })
              )
            }
            { isEmpty(savingGoals) && (
              <TableRowWrapper
                placeholderExample={true}
                lastItem={true}
                columns={[
                  { type: 'name', value: 'Holiday Dream House', size: 2, extraInfo: 'in 10 months' },
                  { type: 'progress', value: 90, size: 4 },
                  { type: 'default', value: '$170,000', size: 1 },
                  { type: 'default', value: '1,700', size: 1 },
                ]}
              />
            )}
          </TableBody>
        </Table>
        <DialogWrapper
          open={savingGoalFormActive}
          onRequestClose={this.closeSavingGoalForm}
          onSubmit={this.updateSavingGoal}
          submitText="Update"
        >
          <SavingGoalForm title="Update goal" defaultSettings={selectedSavingGoal} />
        </DialogWrapper>
      </React.Fragment>
    );
  }
}

export default SavingGoalsIndex;
