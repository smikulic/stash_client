import React, { Component } from 'react';
require('./form-sign-in.scss');

class FormSignIn extends Component {
  render() {
    return (
      <form
        className="form-sign-in"
        onSubmit={this.props.handleSubmit}
      >
        <br /><input ref={this.props.emailRef} placeholder="Email" type="email" />
        <br /><input ref={this.props.passwordRef} placeholder="Password" type="password" />
        <button className="btn-login" type="submit">{this.props.submitMessage}</button>
        {this.props.error && (
          <p className="form-sign-in--error-message">{this.props.errorMessage}</p>
        )}
      </form>
    );
  }
};

export default FormSignIn;
