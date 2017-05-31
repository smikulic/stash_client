import React, { Component } from 'react';
require('./feature-box.scss');

class FeatureBox extends Component {
  render() {
    return (
      <div className="feature-box">
        <h3 className="feature-box--title">{this.props.title}</h3>
        <p className="feature-box--description">{this.props.description}</p>
      </div>
    );
  }
};

export default FeatureBox;
