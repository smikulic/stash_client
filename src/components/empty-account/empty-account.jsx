import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import {
  Table,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

require('./empty-account.scss');

@observer
class EmptyAccount extends Component {

  render() {
    return (
      <TableRow className="table-row table-row--example last">
        <TableRowColumn colSpan="4">
          <div className="table-row--name">Wells Fargo</div>
          <div className="table-row--due"><span className="circle"></span>US Savings account</div>
        </TableRowColumn>
        <TableRowColumn colSpan="3">
          <div className="table-row--value">$12,000</div>
        </TableRowColumn>
        <TableRowColumn colSpan="2">
          <div className="table-row--value">Primary</div>
        </TableRowColumn>
        <TableRowColumn colSpan="3">
          <div className="table-row--value">{moment('20180603', 'YYYYMMDD').fromNow()}</div>
        </TableRowColumn>
        <TableRowColumn colSpan="1"></TableRowColumn>
      </TableRow>
    );
  }
}

export default EmptyAccount;
