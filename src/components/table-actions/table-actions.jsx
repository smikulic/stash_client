import React, { Component } from 'react';
require('./table-actions.scss');

class TableActions extends Component {
  render() {
    return (
      <div className="table-action-item--remove" onClick={this.props.handleOnRemove}>
        <i className="fa fa-trash" />
      </div>
    );
  }
}

export default TableActions;
