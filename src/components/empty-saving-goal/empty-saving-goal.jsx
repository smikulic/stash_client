import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {
  Table,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import ProgressBar from '../../components/progress-bar';

require('./empty-saving-goal.scss');

@observer
class EmptySavingGoal extends Component {
  constructor(props) {
    super(props);
    this.currency = props.currency;
  }

  render() {
    return (
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
          <div className="table-row--value">{this.currency} 170,000</div>
        </TableRowColumn>
        <TableRowColumn colSpan="2">
          <div className="table-row--value">{this.currency} 1,700</div>
        </TableRowColumn>
        <TableRowColumn colSpan="1"></TableRowColumn>
      </TableRow>
    );
  }
}

export default EmptySavingGoal;
