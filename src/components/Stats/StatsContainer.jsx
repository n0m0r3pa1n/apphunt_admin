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
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><a href="#/user-stats/opened-app">Flurry Opened App</a></li>
                                <li><a href="#/user-stats/user-actions">User actions</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <RouteHandler />
            </div>
        );
    }
}