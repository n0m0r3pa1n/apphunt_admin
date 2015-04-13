'use strict';

import React from 'react';


export default class AppActions extends React.Component {
    constructor() {
        super();
        this._approve = this._approve.bind(this)
        this._approve = this._approve.bind(this)
        this._approve = this._approve.bind(this)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    _approve() {
        console.log("Approve")
    }

    _reject() {
        console.log("R")
    }

    _edit() {
        console.log("S")
    }

    render() {
        this.app = this.props.app;
        var approveBtn = this.app.status === 'waiting' ? <button className="btn btn-primary" onClick={this._approve}>Approve</button> : ''
        return (
            <div className="">
                {approveBtn}
                <button className="btn btn-danger" onClick={this._reject}>Reject</button>
                <button className="btn btn-success" onClick={this._edit}>Edit</button>
            </div>);
    }
}