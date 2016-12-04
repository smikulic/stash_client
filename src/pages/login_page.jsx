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
              <form className="form-signin" onSubmit={this.handleSubmit}>
                <br /><input ref="email" placeholder="Email" type="email" />
                <br /><input ref="pass" placeholder="Password" type="password" />
                <button className="btn-start" type="submit">Sign in</button>
                {this.state.error && (
                  <p>Bad login information</p>
                )}
              </form>
              <Link to="/signup" className="btn-start">Register</Link>
            </div>
          </div>
        </div>
      )
    }
  })
);

export default LoginPage;
