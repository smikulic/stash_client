import React, { Component } from 'react';
require('./status-overview-box.scss');

class StatusOverviewBox extends Component {

  render() {
    return (
      <div className="status-overview--box">
        <div className="status-overview--label">
          {this.props.label}
        </div>
        <div className="status-overview--value">
          {this.props.value}
        </div>
      </div>
    );
  }
}

export default StatusOverviewBox;
