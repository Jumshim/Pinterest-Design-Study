import React from 'react';
import { jsx, css } from '@emotion/react'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import Header from './components/Header';

const bodyCss = css`
  display: flex;
  grid-area: body;
  flex-direction: row;
  margin: 0px 80px;
  justify-content: center;
  overflow: scroll;
  scrollbar-width: none;
`;

const LoginBox = () => {
    return (
        <h1> hi </h1>
    );
}


const Account = () => {
    return (
        <div css={bodyCss}>
            <h1> Log In </h1>
            <p> aiodaoisdjaiosdjasiodjsaiodjasiodjaio </p>
        </div>
    );
};

export default Account;