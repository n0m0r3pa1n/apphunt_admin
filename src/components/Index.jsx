'use strict';

import React from 'react';
import AppsListPage from './AppsList/AppsListPage.jsx';
import Nav from './App/Nav.jsx';

import {AppsAPI} from '../api/AppsAPI.js'

(function () {
    var React = require('react'),
        Router = require("react-router"),
        Route = Router.Route,
        HashLocation = Router.HashLocation,
        DefaultRoute = Router.DefaultRoute;
    window.React = React;

    var routes = (
        <Route handler={AppsListPage} path="/">
            <DefaultRoute handler={AppsListPage} />
        </Route>
    );

    React.render(
        <Nav />,
            document.getElementById('nav')
    );

    Router.run(routes, HashLocation, function (Handler, state) {
        var params = state.params;
        React.render(<Handler params={params} />, document.getElementById('content'));
    });

    AppsAPI.getApps("Android");

})();

//
//
