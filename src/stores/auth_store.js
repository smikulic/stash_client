import request from 'superagent';
import { apiPath, clientPath } from '../config/config';

module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token && localStorage.SVuserData) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    apiLoginRequest(email, pass, (res) => {
      if (res.authenticated) {
        let userData = {
          'email': res.email,
          'token': res.token,
          'id': res.id,
        };
        localStorage.token = res.token;
        localStorage.setItem('SVuserData', JSON.stringify(userData));
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  register(email, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    apiRegisterRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return JSON.parse(localStorage.getItem('SVuserData')).token;
  },

  getUserData() {
    return JSON.parse(localStorage.getItem('SVuserData'));
  },

  logout(cb) {
    delete localStorage.token;
    delete localStorage.SVuserData;
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.SVuserData;
  },
  
  onChange() {}
}

function apiLoginRequest(email, pass, cb) {
  request
    .post(apiPath() + '/auth/sign_in')
    .send({ email: email, password: pass })
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err || !res.ok) {
        cb({ authenticated: false });
      } else {
        cb({
          authenticated: true,
          token: Math.random().toString(36).substring(7),
          email: JSON.stringify(res.body.data.email),
          id: JSON.stringify(res.body.data.id)
        });
      }
    });
}

function apiRegisterRequest(email, pass, cb) {
  request
    .post(apiPath() + '/auth')
    .send({ email: email, password: pass, password_confirmation: pass,
      confirm_success_url: `${clientPath()}/login?pass=${pass}` })
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err || !res.ok) {
        cb({ authenticated: false });
     } else {
        cb({
          authenticated: true,
          token: Math.random().toString(36).substring(7)
        });
     }
   });
  }
