import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ProgressBar from '../progress-bar';
require('./table-row-wrapper.scss');

class TableRowWrapper extends Component {
  render() {
    const {
      lastItem,
      inactive,
      columns,
      placeholderExample,
    } = this.props;
    let tableRowClass = 'table-row';
    
    tableRowClass += inactive ? ' inactive' : '';
    tableRowClass += lastItem ? ' last' : '';
    tableRowClass += placeholderExample ? ' table-row--example' : '';

    return (
      <TableRow className={tableRowClass}>
        {
          columns && (
            columns.map((column, index) => {
              const {
                type,
                size,
                value,
                onEditClick,
                onRemoveClick,
                extraInfo,
              } = column;

              if (type === 'name') {
                return (
                  <TableCell key={value + index} colSpan={size}>
                    <div className="table-row--name">
                      {value}
                      { onEditClick && (
                        <i
                          className="table-row--edit fa fa-pencil"
                          onClick={onEditClick}
                        />
                      )}
                      { onRemoveClick && (
                        <i
                          className="table-row--edit fa fa-trash"
                          onClick={onRemoveClick}
                        />
                      )}
                    </div>
                    { extraInfo && (
                      <div className="table-row--extra-info"><span className="circle"></span>{extraInfo}</div>
                    )}
                  </TableCell>
                );
              }

              if (type === 'progress') {
                return (
                  <TableCell key={value + index} colSpan={size}>
                    <div className="table-row--progress">
                      <ProgressBar savedValue={value} />
                    </div>
                  </TableCell>
                );
              }

              if (type === 'default') {
                return (
                  <TableCell key={value + index} colSpan={size}>
                    <div className="table-row--default">{value}</div>
                  </TableCell>
                );
              }
            })
          )
        }
      </TableRow>
    );
  }
}

export default TableRowWrapper;
