import React from 'react';
import { withRouter } from 'react-router';
import authStore from '../stores/auth_store';
import FormSignIn from '../components/form-sign-in';
import FormSignInQuestion from '../components/form-sign-in-question';

const LoginPage = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false
      }
    },

    handleSubmit(event) {
      event.preventDefault();

      const email = this.emailInputElement.value;
      const pass = this.passwordInputElement.value;

      authStore.login(email, pass, (loggedIn) => {
        if (!loggedIn)
          return this.setState({ error: true })

        const { location } = this.props;

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/')
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
              <h2 className="welcome-back-message">Welcome back!</h2>
              <h2 className="sub-title">Sign in to continue to Scroogevault.</h2>
              <FormSignIn
                handleSubmit={this.handleSubmit}
                submitMessage="Login"
                emailRef={el => this.emailInputElement = el}
                passwordRef={el => this.passwordInputElement = el}
                error={this.state.error}
                errorMessage="Wrong login information. Please try again."
              />
              <FormSignInQuestion
                question="Don't have an account?"
                link="/signup"
                linkMessage="Sign up"
              />
            </div>
          </div>
        </div>
      )
    }
  })
);

export default LoginPage;
