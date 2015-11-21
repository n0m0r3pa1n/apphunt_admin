'use strict';

import React from 'react';

export default class Nav extends React.Component {
    render() {
        return <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">AppHunt</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Apps <span className="sr-only">(current)</span></a></li>

                        <li><a href="#/comments">Comments</a></li>
                        <li><a href="#/app-collections">Apps Collections</a></li>
                        <li><a href="#/user-collections">Users Collections</a></li>
                        <li><a href="#/user-stats/opened-app">User Stats</a></li>
                        <li><a href="#/users">Users</a></li>
                        <li><a href="#/version">Version</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    }
}
