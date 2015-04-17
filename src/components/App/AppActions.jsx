'use strict';

import React from 'react';
import {AppAPI} from '../../api/AppAPI.js'
import {EditApp} from '../App/Edit/EditApp.jsx'

export default class AppActions extends React.Component {
    constructor() {
        super();
        this._approve = this._approve.bind(this)
        this._reject = this._reject.bind(this)
        this._edit = this._edit.bind(this)
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

    _edit() {
        console.log("E")
    }

    render() {
        this.app = this.props.app;
        var approveBtn = this.app.status === 'waiting' ? <button className="btn-default btn-primary" onClick={this._approve}>Approve</button> : ''
        return (
            <div className="text-center">
                {approveBtn}
                <button className="btn btn-danger" onClick={this._reject}>Reject</button>
                <EditApp app={this.props.app}/>
            </div>);
    }
}