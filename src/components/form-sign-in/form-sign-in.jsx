import React, { Component } from 'react';
require('./form-sign-in.scss');

class FormSignIn extends Component {
  render() {
    const { emailRef, passwordRef, passwordRepeatRef } = this.props;
    return (
      <form
        className="form-sign-in"
        onSubmit={this.props.handleSubmit}
      >
        { emailRef && (
          <span>
            <br /><input ref={emailRef} placeholder="Email" type="email" />
          </span>
        )}
        { passwordRef && (
          <span>
            <br /><input ref={passwordRef} placeholder="Password" type="password" />
          </span>
        )}
        { passwordRepeatRef && (
          <span>
            <br /><input ref={passwordRepeatRef} placeholder="Repeat Password" type="password" />
          </span>
        )}
        <button className="btn-login" type="submit">{this.props.submitMessage}</button>
        {this.props.error && (
          <p className="form-sign-in--error-message">{this.props.errorMessage}</p>
        )}
      </form>
    );
  }
};

export default FormSignIn;
