import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import symbolFromCurrency from 'currency-symbol-map';
import moment from 'moment';
import accounting from 'accounting';
import { isEmpty } from 'lodash';
import {
  sanitizeValue,
  deadlineInPast,
  normalizeCreatedDate,
  normalizeDeadlineDate,
  monthlyValue,
  savedUntilNowValue,
} from '../../helpers/utils';
import {
  Table,
  TableBody,
  TableHeader,
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import TableToolbarWrapper from '../table-toolbar-wrapper';
import TableHeaderWrapper from '../table-header-wrapper';
import TableRowWrapper from '../table-row-wrapper';
import SavingGoalForm from '../../components/saving-goal-form';
import FormSubmit from '../../components/form-submit';
import EmptySavingGoal from '../empty-saving-goal';

require('./saving-goals-index.scss');

const customDialogStyle = {
  position: 'absolute',
  top: '5%',
  width: '50%',
  maxWidth: 'none',
  transform: 'translate(50%, 64px)',
};

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
    const value = sanitizeValue(e.target['value'].value);
    const savingGoal = {
      description: e.target['description'].value,
      deadline: e.target['deadline'].value,
      value: value,
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
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableHeaderWrapper columns={{'Goal': 4, 'Goal progress': 4, 'Total budget': 2, 'Each month': 2 }} />
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            savingGoals && (
              savingGoals.map((item, index) => {
                const lastItem = savingGoals.length === (index + 1);
                const itemId = item.id;

                // reset created time to the start of the day for accurate calculation
                let normalizedCreatedAt = normalizeCreatedDate(item.created_at);
                let normalizedDeadline = normalizeDeadlineDate(item.deadline);
                // calculate amount to save per month
                const monthly = monthlyValue(normalizedDeadline, normalizedCreatedAt, item.value);
                // calculate how much per goal have you saved so far
                const saved = savedUntilNowValue(normalizedCreatedAt, monthly, item.value);
                const durationTillEnd = moment(normalizedDeadline).diff(moment(), 'months');
                let due = moment(normalizedDeadline).subtract(1, 'month').endOf('month').fromNow();
                
                if (deadlineInPast(normalizedDeadline)) {
                  due = `Goal achieved - ${moment(normalizedDeadline).format('DD MMM YY')}`;
                } else {
                  due = durationTillEnd === 0 ? 'this month' : due;
                }
                
                return (
                  <TableRowWrapper
                    key={itemId}
                    lastItem={lastItem}
                    inactive={deadlineInPast(normalizedDeadline)}
                    columns={[
                      {
                        type: 'name',
                        value: item.description,
                        size: 4,
                        onEditClick: this.handleOnUpdateSavingGoal.bind(this, item),
                        extraInfo: due,
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
                    onRemoveClick={this.handleOnRemoveSavingGoal.bind(this, itemId)}
                  />
                )
              })
            )
          }
          { isEmpty(savingGoals) && <EmptySavingGoal currency={currency} /> }
        </TableBody>
      </Table>

      <Dialog
          modal={false}
          bodyClassName="dialog-body"
          contentStyle={customDialogStyle}
          open={this.state.savingGoalFormActive}
          onRequestClose={this.closeSavingGoalForm}
        >
          <form onSubmit={this.updateSavingGoal}>
            <SavingGoalForm title="Update goal" presetValues={this.state.selectedSavingGoal} />
            <div className="row">
              <div className="col-xs-5 col-xs-push-7">
                <FormSubmit text="Update" />
              </div>
            </div>
          </form>
        </Dialog>
      </span>
    );
  }
}

export default SavingGoalsIndex;
