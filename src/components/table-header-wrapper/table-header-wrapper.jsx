import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';

require('./table-header-wrapper.scss');

class TableHeaderWrapper extends Component {
  render() {
    const columns = this.props.columns;
    return (
      <TableRow className="table-row-header">
        {
          columns && (
            Object.keys(columns).map((columnName) => {
              return (
                <TableHeaderColumn key={`col_${columnName}`} colSpan={columns[columnName]}>
                  {columnName}
                </TableHeaderColumn>
              );
            })
          )
        }
        <TableHeaderColumn colSpan="1"></TableHeaderColumn>
      </TableRow>
    );
  }
};

export default TableHeaderWrapper;
