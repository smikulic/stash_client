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
        <div>
          <div className="section-main login">
            <div className="content">
              <form className="form-signin" onSubmit={this.handleSubmit}>
                <br /><input ref="email" placeholder="Email" type="email" />
                <br /><input ref="pass" placeholder="Password" type="password" />
                <button className="btn-start" type="submit">Submit</button>
                {this.state.error && (
                  <p>Bad register information</p>
                )}
              </form>
            </div>
          </div>
        </div>
      )
    }
  })
);

export default RegisterPage;
