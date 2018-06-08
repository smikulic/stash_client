import React, { Component } from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TableActions from '../table-actions';
import ProgressBar from '../progress-bar';

require('./table-row-wrapper.scss');

class TableRowWrapper extends Component {
  render() {
    const {
      lastItem,
      inactive,
      columns,
      onRemoveClick,
    } = this.props;
    let tableRowClass = 'table-row';
    
    tableRowClass += inactive ? ' inactive' : '';
    tableRowClass += lastItem ? ' last' : '';

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
                extraInfo,
              } = column;

              if (type === 'name') {
                return (
                  <TableRowColumn key={value + index} colSpan={size}>
                    <div className="table-row--name">
                      {value}
                      { onEditClick && (
                        <i
                          className="table-row--edit fa fa-pencil"
                          onClick={onEditClick}
                        />
                      )}
                    </div>
                    { extraInfo && (
                      <div className="table-row--extra-info"><span className="circle"></span>{extraInfo}</div>
                    )}
                  </TableRowColumn>
                );
              }

              if (type === 'progress') {
                return (
                  <TableRowColumn key={value + index} colSpan={size}>
                    <div className="table-row--progress">
                      <ProgressBar savedValue={value} />
                    </div>
                  </TableRowColumn>
                );
              }

              if (type === 'default') {
                return (
                  <TableRowColumn key={value + index} colSpan={size}>
                    <div className="table-row--default">{value}</div>
                  </TableRowColumn>
                );
              }
            })
          )
        }

        <TableRowColumn colSpan="1" className="table-row--actions">
          <TableActions handleOnRemove={onRemoveClick} />
        </TableRowColumn>
      </TableRow>
    );
  }
}

export default TableRowWrapper;