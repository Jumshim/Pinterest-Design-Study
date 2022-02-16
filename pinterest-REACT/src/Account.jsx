/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react';
import { jsx, css } from '@emotion/react'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

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


const LoginBox = () => {
    return (
        <div css={loginCss}>
            <h1> Welcome Back! </h1>
            <input type="text" placeholder="Username/Email" ></input>
            <input type="text" placeholder="Password" ></input>
        </div>
    );
}


const Account = () => {
    return ( <LoginBox></LoginBox>
    );
};

export default Account;