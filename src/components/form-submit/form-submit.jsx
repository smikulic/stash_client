import React, { Component } from 'react';
require('./form-submit.scss');

class FormSubmit extends Component {
  render() {
    return (
      <div className="submit-wrapper">
        <input type="submit" className="button--submit" value={this.props.text || 'Submit'} />
        <i className="button--submit-icon fa fa-check" />
      </div>
    );
  }
}

export default FormSubmit;
