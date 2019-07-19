import React from 'react';
import createReactClass from 'create-react-class';
import { withRouter } from 'react-router';
import authStore from '../../stores/auth_store';
import FormSignIn from '../../components/form-sign-in';
import FormSignInQuestion from '../../components/form-sign-in-question';

const RegisterPage = withRouter(
  createReactClass({

    getInitialState() {
      return {
        error: false
      }
    },

    handleSubmit(event) {
      event.preventDefault();

      const email = this.emailInputElement.value;
      const pass = this.passwordInputElement.value;

      authStore.register(email, pass, (registered) => {
        if (!registered) {
          return this.setState({ error: true });
        }

        const { location } = this.props;

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/login?unconfirmed=true')
        }
      })
    },

    render() {
      return (
        <div className="section-main login">
            <div className="content">
              <div className="form-wrapper">
                <h2>Scroogevault</h2>
                <div className="logo"></div>
                <br />
                <h2 className="sub-title">Sign up to continue to Scroogevault.</h2>
                <FormSignIn
                  handleSubmit={this.handleSubmit}
                  submitMessage="Sign up"
                  emailRef={el => this.emailInputElement = el}
                  passwordRef={el => this.passwordInputElement = el}
                  error={this.state.error}
                  errorMessage="Wrong signup information. Please try again."
                />
                <FormSignInQuestion
                  question="Already have an account?"
                  link="/login"
                  linkMessage="Sign in"
                />
              </div>
            </div>
          </div>
      )
    }
  })
);

export default RegisterPage;
