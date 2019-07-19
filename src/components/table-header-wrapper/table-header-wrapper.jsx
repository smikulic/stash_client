import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

require('./table-header-wrapper.scss');

class TableHeaderWrapper extends Component {
  render() {
    const columns = this.props.columns;
    return (
      <TableRow className="table-row-header">
        {
          columns && (
            Object.keys(columns).map((columnName, index) => {
              return (
                <TableCell key={columnName + index} colSpan={columns[columnName]}>
                  {columnName}
                </TableCell>
              );
            })
          )
        }
        <TableCell colSpan="1"></TableCell>
      </TableRow>
    );
  }
};

export default TableHeaderWrapper;
