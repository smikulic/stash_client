import React from 'react';
require('./progress-bar-cell.scss');

export default function ProgressBarCell({ filled }) {
  let progressBarCellClass = filled ?
    'progress-bar--filled-cell' :
    'progress-bar--empty-cell';

  return (
    <li className={progressBarCellClass}>
      <div className="cell"></div>
    </li>
  );
}
