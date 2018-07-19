import React from 'react';
import { withRouter } from 'react-router';
import authStore from '../../stores/auth_store';
import FormSignIn from '../../components/form-sign-in';

const ResetPasswordPage = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false,
        resetInstructionsSent: false,
      }
    },

    handleSubmit(event) {
      event.preventDefault();

      const email = this.emailInputElement.value;
      const redirectUrl = 'new_password';

      authStore.resetPassword(email, redirectUrl);
      this.setState({ resetInstructionsSent: true });
    },

    render() {
      return (
        <div className="section-main login">
          { this.state.resetInstructionsSent && (
            <div className="message-unconfirmed">Check your email for reset password instructions!</div>
          )}
          <div className="content">
            <div className="form-wrapper">
              <h2>Scroogevault</h2>
              <div className="logo"></div>
              <br />
              <h2 className="sub-title">We will send reset instructions to your email.</h2>
              <FormSignIn
                handleSubmit={this.handleSubmit}
                submitMessage="Reset password"
                emailRef={el => this.emailInputElement = el}
                error={this.state.error}
                errorMessage="Email doesn't exist. Please try again."
              />
            </div>
          </div>
        </div>
      )
    }
  })
);

export default ResetPasswordPage;
