import React, { Component } from 'react';
require('./form-title.scss');

class FormTitle extends Component {
  render() {
    if (this.props.title) {
      return (
        <div className="row">
          <div className="col-xs-8 col-xs-push-2">
            <div className="form--title-wrapper">
              <div className="form--title">
                {this.props.title}
                </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default FormTitle;
