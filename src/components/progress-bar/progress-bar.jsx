import React, { Component } from 'react';
require('./progress-bar.scss');

class ProgressBar extends Component {
  render() {
    let progressBarsCells = [];
    
    for (var i = 0; i < 10; i++) {
      if (this.props.savedValue && (i < Math.round(10 * this.props.savedValue.toFixed(2) / 100))) {
        progressBarsCells.push(
          <li key={`progress-bar--filled-cell${i}`}
            className="progress-bar--filled-cell"
            >
            <div className="cell"></div>
          </li>
        );
      } else {
        progressBarsCells.push(
          <li key={`progress-bar--empty-cell${i}`}
            className="progress-bar--empty-cell"
          >
            <div className="cell"></div>
          </li>
        );
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
