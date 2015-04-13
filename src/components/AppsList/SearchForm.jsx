'use strict';

import React from 'react';
import {AppsStore} from '../../stores/AppsStore.js'
import {AppsAPI} from '../../api/AppsAPI.js'

export default class SearchForm extends React.Component {
    constructor() {
        super();
        this._onStatusChange = this._onStatusChange.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    _onStatusChange(event) {
        let platform = event.target.value;
        AppsAPI.getApps(platform)
    }

    render() {
        return (
            <div className="col-md-offset-2 col-lg-4 panel-heading">
                <div className="form-inline">
                    <div className="input-group-lg col-lg-4">
                        <form>
                            <input type="radio" name="platform" value="Android" defaultChecked onChange={this._onStatusChange} />
                            <label> Android</label>
                            <input type="radio" name="platform" value="iOS" onChange={this._onStatusChange} />
                            <label> iOS</label>
                        </form>
                    </div>
                    <div className="input-group-lg col-lg-3 dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button"  aria-expanded="true">
                            Status
                            <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                            <li><a id="status-all" data-bind="click: getApps('all')" href="#">Everything</a></li>
                            <li><a id="status-waiting" data-bind="click: getApps('waiting')" href="#">Waiting</a></li>
                            <li><a id="status-approved" data-bind="click: getApps('approved')" href="#">Approved</a></li>
                        </ul>
                    </div>
                    <button id="get_apps" className="btn btn-primary">
                        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                    </button>
                    <button id="add_app" className="btn btn-success">
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </div>
            </div>);
    }
}