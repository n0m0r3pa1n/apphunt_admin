'use strict';

import React from 'react';
import {AppAPI} from '../../api/AppAPI.js'
import {EditApp} from '../App/Edit/EditApp.jsx'

export default class AppActions extends React.Component {
    constructor() {
        super();
        this._approve = this._approve.bind(this)
        this._reject = this._reject.bind(this)
        this._delete = this._delete.bind(this)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    _approve() {
        AppAPI.changeAppStatus(this.props.app.package, 'approved')
    }

    _reject() {
        AppAPI.changeAppStatus(this.props.app.package, 'rejected')
    }
    _delete() {
        var r = confirm("Are you sure you want to delete " + this.props.app.name);
        if (r == true) {
            AppAPI.deleteApp(this.props.app.package)
        }
    }

    render() {
        this.app = this.props.app;
        var approveBtn = this.app.status === 'waiting' ? <button className="btn btn-default btn-primary" style={{marginRight: 10}} onClick={this._approve}>Approve</button> : ''
        return (
            <div className="col-md-12">
                {approveBtn}
                <button className="btn btn-danger" style={{marginRight: 10}} onClick={this._reject}>Reject</button>
                <button className="btn btn-warning" style={{marginRight: 10}} onClick={this._delete}>Delete</button>
                <EditApp app={this.props.app}/>
            </div>);
    }
}