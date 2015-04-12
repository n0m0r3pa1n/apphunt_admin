'use strict';

import React from 'react';
import {AppsStore} from '../../stores/AppsStore.js'

export default class AppsList extends React.Component {
    constructor() {
        super();
        this.setApps = this.setApps.bind(this);
        this.getApps = this.getApps.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        AppsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppsStore.removeChangeListener(this._onChange);
    }

    _onChange(data) {
        this.setApps(AppsStore.getApps())
    }

    setApps(data) {
        this.data = data;
        this.setState({data: data})
    }
    getApps() {
        return this.data
    }

    render() {
        var data = this.state !== null ? this.state.data : [];
        if(data == null) {
            data = []
        }

        var iconStyle = {
            width: 96
        }
        return (
            <div classNameName="row panel">
                <table className="table table-bordered table-hover panel-body" id="apps_table">
                    <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Url</th>
                        <th>Short Url</th>
                        <th>Created At</th>
                        <th>Created By</th>
                        <th>Status</th>
                        <th>Votes</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(data).map( (field, i) => {
                            var app = data.apps[i]
                            return(
                                <tr>
                                    <td><img src={app.icon} style={iconStyle}/>    </td>
                                    <td><h4> <a data-bind="attr: { href: urlPath }, text: name" /></h4></td>
                                    <td data-bind="text: description"></td>
                                    <td><a data-bind="attr: { href: url }" target="_blank">URL</a></td>
                                    <td><a data-bind="attr: { href: shortUrl }" target="_blank">Short URL</a></td>
                                    <td><input data-bind="value: createdAt" type="text" name="datepicker" /></td>
                                    <td data-bind="text: createdBy"></td>
                                    <td data-bind="text: status"> {app.status}</td>
                                    <td>
                                        <label data-bind="text: votesCount"></label>
                                        <div>
                                            <button  className="btn btn-success" data-bind="click:  function() { vote(_id) }">
                                                <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                            </button>
                                            <button  className="btn btn-danger" data-bind="click:  function() { unvote(_id) }">
                                                <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div data-bind="if: status ==='waiting'">
                                            <button className="btn btn-primary" data-bind="click:  function() { approve(package) }">Approve</button>
                                        </div>
                                        <button className="btn btn-danger" data-bind="click:  function() { reject(package) }">Reject</button>
                                        <button className="btn btn-success" data-bind="click:  function() { save(package) }">Save</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
            </div>);
    }
}