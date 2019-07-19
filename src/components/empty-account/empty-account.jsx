import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

require('./empty-account.scss');

@observer
class EmptyAccount extends Component {

  render() {
    return (
      <TableRow className="table-row table-row--example last">
        <TableCell colSpan="4">
          <div className="table-row--name">Wells Fargo</div>
          <div className="table-row--due"><span className="circle"></span>US Savings account</div>
        </TableCell>
        <TableCell colSpan="3">
          <div className="table-row--value">$12,000</div>
        </TableCell>
        <TableCell colSpan="2">
          <div className="table-row--value">Primary</div>
        </TableCell>
        <TableCell colSpan="3">
          <div className="table-row--value">{moment('20180603', 'YYYYMMDD').fromNow()}</div>
        </TableCell>
        <TableCell colSpan="1"></TableCell>
      </TableRow>
    );
  }
}

export default EmptyAccount;
