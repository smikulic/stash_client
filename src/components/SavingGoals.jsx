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

require('./saving-goals.scss');

class SavingGoals extends Component {

  constructor(props) {
    super(props);

    this.savingGoals = this.props.savingGoals;
    this.currency = this.props.userData.currency;
  }

  render() {
    return (
      <Table style={{background: '#F5F5F5'}}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="4">Goal</TableHeaderColumn>
            <TableHeaderColumn colSpan="1">Saved</TableHeaderColumn>
            <TableHeaderColumn colSpan="1">Monthly</TableHeaderColumn>
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
                  <TableRow key={item.id} style={{height: '6rem'}}>
                    <TableRowColumn colSpan="4">
                      <div className="table-row--name">{item.name}</div>
                      <div className="table-row--due"><span className="circle"></span>{due}</div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="1">
                      <div className="table-row--saved">{saved.toFixed(2)}%</div>
                    </TableRowColumn>
                    <TableRowColumn colSpan="1">
                      <div className="table-row--monthly">{monthly} {symbolFromCurrency(this.currency)}</div>
                    </TableRowColumn>
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
