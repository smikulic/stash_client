import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
require('./table-header-wrapper.scss');

export default function TableHeaderWrapper({ columns, handleSortAction, sortedBy }) {
  return (
    <tbody>
      <TableRow className="table-row-header">
        {
          columns && (
            Object.keys(columns).map((columnName, index) => (
              <TableCell key={columnName + index} colSpan={columns[columnName].span} align="left">
                {columnName}
                { sortedBy.columnName === columnName && (
                  <i className={`button-sort fa fa-sort-${sortedBy.direction}`} onClick={() => handleSortAction(columnName, sortedBy.direction)} />
                )}
                { sortedBy.columnName !== columnName && columns[columnName].sort !== false && (
                  <i className="button-sort fa fa-sort" onClick={() => handleSortAction(columnName)} />
                )}
              </TableCell>
            ))
          )
        }
      </TableRow>
    </tbody>
  );
};
