import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Login from './pages/login';
import Home from './pages/home';

export default function routes(){
    return (
        <BrowserRouter>
            <Route path={'/'} component={Login} exact/>
            <Route path={'/dev/:id'} component={Home}/>
        </BrowserRouter>

    );
}
