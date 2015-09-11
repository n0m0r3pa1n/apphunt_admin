'use strict';

import React from 'react';
import AppsListPage from './AppsList/AppsListPage.jsx';
import UserStatsPage from './Stats/Users/UserStatsPage.jsx';
import AppComments from './Comments/App/AppComments.js';
import AppCollections from './AppCollections/AppCollections.jsx'
import AppCollectionDetails from './AppCollections/Collection/CollectionDetails.jsx'
import UserCollections from './UserCollections/UserCollections.jsx'
import UsersScores from './UserCollections/UsersScores/UsersScores.jsx'
import UserCollection from './UserCollections/UserCollection.jsx'
import Users from './Users/Users.jsx'
import Version from './Version/Version.jsx'
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
            <Route name="app-collections" path="/app-collections" handler={AppCollections} />
            <Route name="app-collection" path="/app-collections/:collectionId" handler={AppCollectionDetails} />
            <Route name="user-collections" path="/user-collections" handler={UserCollections} />
            <Route name="user-scores" path="/user-scores" handler={UsersScores} />
            <Route name="user-collection" path="/user-collections/:collectionId" handler={UserCollection} />
            <Route name="user-stats" path="/user-stats" handler={UserStatsPage} />
            <Route name="users" path="/users" handler={Users} />
            <Route name="version" path="/version" handler={Version} />
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