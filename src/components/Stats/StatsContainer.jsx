'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';

export default class StatsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <a href="#/user-stats/opened-app">Flurry Opened Apps</a>
                <a href="#/user-stats/user-actions">User Actions</a>
                <RouteHandler />
            </div>
        );
    }
}