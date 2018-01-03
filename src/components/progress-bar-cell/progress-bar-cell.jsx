import React, { Component } from 'react';
require('./progress-bar-cell.scss');

class ProgressBarCell extends Component {
  render() {
    let progressBarCellClass = this.props.filled ?
      'progress-bar--filled-cell' :
      'progress-bar--empty-cell';

    return (
      <li className={progressBarCellClass}>
        <div className="cell"></div>
      </li>
    );
  }
}

export default ProgressBarCell;
