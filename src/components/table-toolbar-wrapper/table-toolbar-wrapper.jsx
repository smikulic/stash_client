import React, { Component } from 'react';
require('./table-toolbar-wrapper.scss');

class TableToolbarWrapper extends Component {
  render() {
    const { title, onPlusClick } = this.props;
    return (
      <div className="table-toolbar">
        <div className="table-toolbar--title">{title}</div>
        <div
          className="table-toolbar--button"
          onClick={onPlusClick}
        >
          <i className="fa fa-plus"></i>
        </div>
      </div>
    );
  }
};

export default TableToolbarWrapper;
