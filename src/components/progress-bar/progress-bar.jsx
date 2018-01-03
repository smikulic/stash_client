import React, { Component } from 'react';
import ProgressBarCell from '../progress-bar-cell';
require('./progress-bar.scss');

class ProgressBar extends Component {
  render() {
    let progressBarsCells = [];
    
    for (var i = 0; i < 10; i++) {
      if (this.props.savedValue && (i < Math.round(10 * this.props.savedValue.toFixed(2) / 100))) {
        progressBarsCells.push(<ProgressBarCell key={`progress-bar--cell${i}`} filled />);
      } else {
        progressBarsCells.push(<ProgressBarCell key={`progress-bar--cell${i}`} />);
      }
    }

    return (
      <ul className="progress">
        {progressBarsCells}
      </ul>
    );
  }
}

export default ProgressBar;
