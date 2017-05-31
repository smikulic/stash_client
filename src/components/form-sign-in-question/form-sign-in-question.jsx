import React, { Component } from 'react';
import { Link } from 'react-router';
require('./form-sign-in-question.scss');

class FormSignInQuestion extends Component {
  render() {
    return (
      <div className="form-sign-in-question">
        {this.props.question}
        <Link to={this.props.link} className="btn-login">{this.props.linkMessage}</Link>
      </div>
    );
  }
};

export default FormSignInQuestion;
