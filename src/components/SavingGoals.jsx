import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';


class SavingGoals extends Component {
  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="2">Goal</TableHeaderColumn>
            <TableHeaderColumn colSpan="1">Saved</TableHeaderColumn>
            <TableHeaderColumn colSpan="1">Monthly</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn colSpan="2">Vacation</TableRowColumn>
            <TableRowColumn colSpan="1">50%</TableRowColumn>
            <TableRowColumn colSpan="1">250e</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

export default SavingGoals;
