import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
require('./table-header-wrapper.scss');

export default function TableHeaderWrapper({ columns }) {
  return (
    <tbody>
      <TableRow className="table-row-header">
        {
          columns && (
            Object.keys(columns).map((columnName, index) => (
              <TableCell key={columnName + index} colSpan={columns[columnName]}>
                {columnName}
              </TableCell>
            ))
          )
        }
      </TableRow>
    </tbody>
  );
};
