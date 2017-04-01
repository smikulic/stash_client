import React, { Component } from 'react';
import moment from 'moment';
import symbolFromCurrency from 'currency-symbol-map';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';


class SavingGoals extends Component {

  constructor(props) {
    super(props);

    this.savingGoals = this.props.savingGoals;
    this.currency = this.props.userData.currency;
  }

  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="3">Goal</TableHeaderColumn>
            <TableHeaderColumn colSpan="1">Saved</TableHeaderColumn>
            <TableHeaderColumn colSpan="1">Monthly</TableHeaderColumn>
            <TableHeaderColumn colSpan="1">Due</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.savingGoals && (
              this.savingGoals.map((item) => {
                let durationMonthly = moment(item.end_date).diff(moment(item.start_date), 'months');
                let monthly = Math.round(item.total_value / durationMonthly);
                let due = moment(item.end_date).subtract(1, 'month').endOf('month').fromNow();
                let percentage = monthly / item.total_value * 100;
                let saved = moment().diff(moment(item.start_date), 'months') * percentage;

                due = moment(item.end_date).diff(moment(), 'months') === 0 ? 'this month' : due;

                return (
                  <TableRow key={item.id}>
                    <TableRowColumn colSpan="3">{item.name}</TableRowColumn>
                    <TableRowColumn colSpan="1">{saved}%</TableRowColumn>
                    <TableRowColumn colSpan="1">{monthly} {symbolFromCurrency(this.currency)}</TableRowColumn>
                    <TableRowColumn colSpan="1">{due}</TableRowColumn>
                  </TableRow>
                )
              })
            )
          }
        </TableBody>
      </Table>
    );
  }
}

export default SavingGoals;
