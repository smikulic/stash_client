import React from 'react';
import { Link, withRouter } from 'react-router';
import authStore from '../stores/auth_store';

const LoginPage = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false
      }
    },

    handleSubmit(event) {
      event.preventDefault()

      const email = this.refs.email.value
      const pass = this.refs.pass.value

      authStore.login(email, pass, (loggedIn) => {
        if (!loggedIn)
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
        <div>
          <div className="section-main login">
            <div className="content">
              <div className="form-wrapper">
                <h2>Scroogevault</h2>
                <div className="logo"></div>
                <br />
                <h2>Welcome back!</h2>
                <h2 className="sub-title">Sign in to continue to Scroogevault.</h2>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <br /><input ref="email" placeholder="Email" type="email" />
                  <br /><input ref="pass" placeholder="Password" type="password" />
                  <button className="btn-login" type="submit">Login</button>
                  {this.state.error && (
                    <p className="error-message">Bad login information. Please Try again.</p>
                  )}
                </form>
                <div className="sign-up-field">
                  Don't have an account?
                  <Link to="/signup" className="btn-login">Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  })
);

export default LoginPage;
