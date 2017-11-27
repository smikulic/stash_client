import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import symbolFromCurrency from 'currency-symbol-map';
import moment from 'moment';
import accounting from 'accounting';
import { isEmpty } from 'lodash';
import { sanitizeValue } from '../../helpers/utils';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import ProgressBar from '../../components/progress-bar';
import TableActions from '../../components/table-actions';
import SavingGoalForm from '../../components/saving-goal-form';
import FormSubmit from '../../components/form-submit';

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
      console.log(this.userId, this.state.selectedSavingGoal.id, savingGoal);
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
      <div className="table-toolbar">
        <div className="table-toolbar--title">Saving Goals</div>
        <div
          className="table-toolbar--button"
          onClick={this.props.handleAddSavingGoal}
        >
          <i className="fa fa-plus"></i>
        </div>
      </div>

      <Table className="table">
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow className="table-row-header">
            <TableHeaderColumn colSpan="4">Goal</TableHeaderColumn>
            <TableHeaderColumn colSpan="4">Goal progress</TableHeaderColumn>
            <TableHeaderColumn colSpan="2">Total budget</TableHeaderColumn>
            <TableHeaderColumn colSpan="2">Each month</TableHeaderColumn>
            <TableHeaderColumn colSpan="1"></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            savingGoals && (
              savingGoals.map((item, index) => {
                // reset created time to the start of the day for accurate calculation
                let normalizedCreatedAt = moment(item.created_at).utcOffset(0);
                normalizedCreatedAt.set({hour:0,minute:0,second:0,millisecond:0});
                let durationMonthly = moment(item.deadline).diff(normalizedCreatedAt, 'months');
                let monthly = Math.round(item.value / durationMonthly);
                let durationSince = moment().diff(moment(item.created_at), 'months');
                let due = moment(item.deadline).subtract(1, 'month').endOf('month').fromNow();
                let percentage = monthly / item.value * 100;
                let saved = durationSince * percentage;
                let durationTillEnd = moment(item.deadline).diff(moment(), 'months');

                due = durationTillEnd === 0 ? 'this month' : due;
                
                return (
                  <TableRow key={item.id} className={savingGoals.length === (index + 1) ? 'table-row last' : 'table-row'}>
                    <TableRowColumn colSpan="4">
                      <div className="table-row--name">
                        {item.description}
                        <i
                          className="table-row--edit fa fa-pencil"
                          onClick={this.handleOnUpdateSavingGoal.bind(this, item)}
                        />
                      </div>
                      <div className="table-row--due"><span className="circle"></span>{due}</div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="4">
                      <div className="table-row--saved">
                        <ProgressBar savedValue={saved} />
                      </div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="2">
                      <div className="table-row--value">{accounting.formatNumber(item.value)} {currency}</div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="2">
                      <div className="table-row--value">{accounting.formatNumber(monthly)} {currency}</div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="1" className="table-row--actions">
                      <TableActions handleOnRemove={this.handleOnRemoveSavingGoal.bind(this, item.id)} />
                    </TableRowColumn>
                  </TableRow>
                )
              })
            )
          }
          {
            isEmpty(savingGoals) && (
              <TableRow className="table-row table-row--example last">
                <TableRowColumn colSpan="4">
                  <div className="table-row--name">Holiday Dream House</div>
                  <div className="table-row--due"><span className="circle"></span>in 10 months</div>
                </TableRowColumn>
                <TableRowColumn colSpan="4">
                  <div className="table-row--saved">
                    <ProgressBar savedValue={90} />
                  </div>
                </TableRowColumn>
                <TableRowColumn colSpan="2">
                  <div className="table-row--value">170,000 {currency}</div>
                </TableRowColumn>
                <TableRowColumn colSpan="2">
                  <div className="table-row--value">1,700 {currency}</div>
                </TableRowColumn>
                <TableRowColumn colSpan="1"></TableRowColumn>
              </TableRow>
            )
          }
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
