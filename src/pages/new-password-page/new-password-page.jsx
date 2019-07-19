import React from 'react';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import authStore from '../../stores/auth_store';
import FormSignIn from '../../components/form-sign-in';

const NewPasswordPage = withRouter(
  createReactClass({

    getInitialState() {
      return {
        error: false
      }
    },

    handleSubmit(event) {
      event.preventDefault();

      const password = this.passwordInputElement.value;
      const passwordRepeat = this.passwordRepeatInputElement.value;
      const urlParams = new URLSearchParams(window.location.search);
      const headers = {
        'uid': urlParams.get('uid'),
        'access-token': urlParams.get('token'),
        'expiry': urlParams.get('expiry'),
        'config': urlParams.get('config'),
        'client': urlParams.get('client_id'),
        'reset_password': urlParams.get('reset_password'),
      };

      authStore.newPassword(password, passwordRepeat, headers);
    },

    render() {
      return (
        <div className="section-main login">
            <div className="content">
              <div className="form-wrapper">
                <h2>Scroogevault</h2>
                <div className="logo"></div>
                <br />
                <h2 className="sub-title">Enter your new password.</h2>
                <FormSignIn
                  handleSubmit={this.handleSubmit}
                  submitMessage="Confirm password"
                  passwordRef={el => this.passwordInputElement = el}
                  passwordRepeatRef={el => this.passwordRepeatInputElement = el}
                  error={this.state.error}
                  errorMessage="Password isn't matching. Please try again."
                />
              </div>
            </div>
          </div>
      )
    }
  })
);

export default NewPasswordPage;
