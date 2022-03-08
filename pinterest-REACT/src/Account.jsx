/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react';
import {jsx, css} from '@emotion/react';
import BASE_URL from './utils';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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

export class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', error: '', isAuth: false};
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
      credentials: 'include',
      body: JSON.stringify(this.state)
    })
    .then((response) =>{
      if(response.status === 200) {
        return response.json();
      } else {
        throw "Login not successful";
      }
    })
    .then((body) => {
      this.setState({error: '', isAuth: true});
      console.log(body.message);
    })
    .catch((error) => this.setState({error: error}));
  }

  render() {
    return (
      <div css={loginCss}>
        <h1> Login Here </h1>
        <input type="text" placeholder="Username/Email" onChange={this.changeUsername}></input>
        <input type="password" placeholder="Password" onChange={this.changePassword}></input>
        <button onClick={this.sendCredentials}> Login </button>
        {this.state.error && <span>{this.state.error}</span>}
        {this.state.isAuth && (<Navigate to="/" replace={true}/>)}
      </div>
    );
  }
}

export class SignupBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      confEmail: '', 
      password: '', 
      confPassword: '',
      name: '',
      isValid: true
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.changeConfEmail = this.changeConfEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeConfPassword = this.changeConfPassword.bind(this);
    this.changeName = this.changeName.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  changeEmail(event) {
    this.setState({email: event.target.value});
  }

  changeConfEmail(event) {
    this.setState({confEmail: event.target.value});
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  changeConfPassword(event) {
    this.setState({confPassword: event.target.value});
  }

  changeName(event) {
    this.setState({name: event.target.value});
  }

  async addUser(event) {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((data) => {data.json(); console.log(data)})
  }

  //button for signup, 
  //database insert command if not exists
  //make sure email is not used or error,

  //addUser command

  render() {
    console.log(this.state);
    return (
      <div css={loginCss}>
        <h1> Sign Up Here </h1>
        <input type="text" placeholder="Email" onChange={this.changeEmail} />
        <input type="text" placeholder="Confirm Email" onChange={this.changeConfEmail} />
        <input type="password" placeholder="Password" onChange={this.changePassword} />
        <input type="password" placeholder="Confirm Password" onChange={this.changeConfPassword} />
        <input type="text" placeholder="Full Name" onChange={this.changeName} />
    
        <button onClick={this.addUser}> Sign Up </button>
      </div>
    )
  }

}





export const Account = () => {
  return <LoginBox></LoginBox>;
};