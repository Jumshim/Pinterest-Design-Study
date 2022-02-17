/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react';
import {jsx, css} from '@emotion/react';
import BASE_URL from './utils';

const bodyCss = css`
  display: flex;
  grid-area: body;
  flex-direction: row;
  margin: 80px 80px;
  justify-content: center;
  overflow: scroll;
  scrollbar-width: none;
`;

const loginCss = css`
  height: 480px;
  width: 400px;
  border-radius: 30px;
  justify-content: center;
`;

/**
 * class Credential extends React.Component {
    constructor() {
        this.state = {value: ''};
        this.handleChange
    }
}
 */

/**
 * use cookies to know if person needs to login or see content
 * can be an id or something; every request sends the cookie
 * if the backend accepts the cookie, then reauthentication is not needed
 * otherwise, we need to authenticate
 * 
 * use passport to hash password
 * when someone logs in, you find them by username
 * check if passport matches
 * 
 * if no username, then redirect to sign up
 */

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.sendCredentials = this.sendCredentials.bind(this);
  }

  changeUsername(event) {
    this.setState({username: event.target.value});
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  async sendCredentials(event) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
  }

  render() {
    return (
      <div css={loginCss}>
        <h1> Welcome Back! </h1>
        <input type="text" placeholder="Username/Email" onChange={this.changeUsername}></input>
        <input type="password" placeholder="Password" onChange={this.changePassword}></input>
        <button onClick={this.sendCredentials}> Login </button>
      </div>
    );
  }
}

const Account = () => {
  return <LoginBox></LoginBox>;
};

export default Account;
