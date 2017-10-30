import React, { Component } from 'react';
import moment from 'moment';
import symbolFromCurrency from 'currency-symbol-map';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { isEmpty } from 'lodash';

require('./saving-goals-index.scss');

@inject('savingGoalsStore', 'userStore')
@withRouter
@observer
class SavingGoalsIndex extends Component {

  componentWillMount() {
    this.props.savingGoalsStore.loadSavingGoals(this.props.userStore.userData.id);
  }

  render() {
    const { savingGoals } = this.props.savingGoalsStore;
    return (
      <Table className="table">
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="3">Goal</TableHeaderColumn>
            <TableHeaderColumn colSpan="3">Saved</TableHeaderColumn>
            <TableHeaderColumn colSpan="1">Monthly</TableHeaderColumn>
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
                
                let currency = this.props.userStore.userSettings ?
                symbolFromCurrency(this.props.userStore.userSettings.main_currency) :
                null;

                let progressBarsCells = [];
                for (var i = 0; i < 10; i++) {
                  if (i < Math.round(10 * saved.toFixed(2) / 100)) {
                    progressBarsCells.push(
                      <li
                        key={`progress-bar--filled-cell${i}`}
                        className="progress-bar--filled-cell"
                        >
                        <div className="cell"></div>
                      </li>
                    );
                  } else {
                    progressBarsCells.push(
                      <li
                        key={`progress-bar--empty-cell${i}`}
                        className="progress-bar--empty-cell"
                      >
                        <div className="cell"></div>
                      </li>
                    );
                  }
                }

                return (
                  <TableRow key={item.id} className={savingGoals.length === (index + 1) ? 'table-row last' : 'table-row'}>
                    <TableRowColumn colSpan="3">
                      <div className="table-row--name">{item.description}</div>
                      <div className="table-row--due"><span className="circle"></span>{due}</div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="3">
                      <div className="table-row--saved">
                        <ul className="progress">
                        {progressBarsCells}
                        </ul>
                      </div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="1">
                      <div className="table-row--monthly">{monthly} {currency}</div>
                    </TableRowColumn>
                  </TableRow>
                )
              })
            )
          }
          {
            isEmpty(savingGoals) && (
              <TableRow>
                <TableRowColumn>
                  No saving goals added yet!
                </TableRowColumn>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    );
  }
}

export default SavingGoalsIndex;
