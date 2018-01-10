import React, { Component } from 'react';
require('./feature-box.scss');

class FeatureBox extends Component {
  render() {
    return (
      <div className="feature-box">
        { this.props.children && (
          this.props.children
        )}
        { !this.props.children && (
          <span>
            <h3 className="feature-box--title">{this.props.title}</h3>
            <p className="feature-box--description">{this.props.description}</p>
          </span>
        )}
      </div>
    );
  }
};

export default FeatureBox;
