import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import Header from './components/Header';

const Account = () => {
    return (
        <div>
            <h1> Log In </h1>
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <App></App>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Home;