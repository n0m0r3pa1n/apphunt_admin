'use strict';

import React from 'react';
import AppsList from './AppsList/AppsList.jsx';
import Nav from './App/Nav.jsx';

import {AppsAPI} from '../api/AppsAPI.js'

(function () {
    var React = require('react'),
        injectTapEventPlugin = require("react-tap-event-plugin"),
        Router = require("react-router"),
        Route = Router.Route,
        HashLocation = Router.HashLocation,
        DefaultRoute = Router.DefaultRoute;
    window.React = React;

    var routes = (
        <Route handler={AppsList} path="/">
            <DefaultRoute handler={AppsList} />
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

    injectTapEventPlugin();
})();

//
//
