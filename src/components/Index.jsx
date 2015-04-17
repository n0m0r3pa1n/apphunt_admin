'use strict';

import React from 'react';
import AppsListPage from './AppsList/AppsListPage.jsx';
import AppComments from './Comments/App/AppComments.js'
import Nav from './App/Nav.jsx';

(function () {
    var React = require('react'),
        Router = require("react-router"),
        Route = Router.Route,
        HashLocation = Router.HashLocation,
        DefaultRoute = Router.DefaultRoute;
    window.React = React;

    var routes = (
        <Route path="/">
            <DefaultRoute handler={AppsListPage} />
            <Route name="comments" path="/comments/:appId" handler={AppComments} />
        </Route>
    );

    React.render(
        <Nav />,
            document.getElementById('nav')
    );

    Router.run(routes, HashLocation, function (Handler, state) {
        let params = state.params;
        let query = state.query;
        React.render(<Handler params={params} query={query} />, document.getElementById('content'));
    });

})();

//
//
