import React from 'react';
import { Link, withRouter } from 'react-router';
import authStore from '../stores/auth_store';

const RegisterPage = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false
      }
    },

    handleSubmit(event) {
      event.preventDefault();

      const email = this.refs.email.value;
      const pass = this.refs.pass.value;

      authStore.register(email, pass, (registered) => {
        if (!registered)
          return this.setState({ error: true })

        const { location } = this.props

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
                <h2 className="sub-title">Sign up to continue to Scroogevault.</h2>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <br /><input ref="email" placeholder="Email" type="email" />
                  <br /><input ref="pass" placeholder="Password" type="password" />
                  <button className="btn-login" type="submit">Sign up</button>
                  {this.state.error && (
                    <p className="error-message">Wrong signup information. Please Try again.</p>
                  )}
                </form>
                <div className="sign-up-field">
                  Already have an account?
                  <Link to="/login" className="btn-login">Sign in</Link>
                </div>
              </div>
            </div>
          </div>
      )
    }
  })
);

export default RegisterPage;
