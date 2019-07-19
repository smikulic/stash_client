import React, { Component } from 'react';
import { observer } from 'mobx-react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
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
        <TableCell colSpan="4">
          <div className="table-row--name">Holiday Dream House</div>
          <div className="table-row--due"><span className="circle"></span>in 10 months</div>
        </TableCell>
        <TableCell colSpan="4">
          <div className="table-row--saved">
            <ProgressBar savedValue={90} />
          </div>
        </TableCell>
        <TableCell colSpan="2">
          <div className="table-row--value">{this.currency} 170,000</div>
        </TableCell>
        <TableCell colSpan="2">
          <div className="table-row--value">{this.currency} 1,700</div>
        </TableCell>
        <TableCell colSpan="1"></TableCell>
      </TableRow>
    );
  }
}

export default EmptySavingGoal;
