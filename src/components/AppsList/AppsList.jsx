'use strict';

import React from 'react';
import {AppsStore} from '../../stores/AppsStore.js'
import {VotesAPI} from '../../api/VotesAPI.js'
import SearchForm from './SearchForm.jsx'

var DatePicker = require('react-datepicker-component/DatePicker.jsx')
var DatePickerInput = require('react-datepicker-component/DatePickerInput.jsx')

export default class AppsList extends React.Component {
    constructor() {
        super();
        this.vote = this.vote.bind(this)
        this.unvote = this.unvote.bind(this)
        this.setApps = this.setApps.bind(this);
        this.getApps = this.getApps.bind(this);
        this._onChange = this._onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
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

    vote(id){
        VotesAPI.vote(id);
    }

    unvote(id) {
        VotesAPI.unvote(id);
    }

    render() {
        var returnDate = function(date) {return date};
        var data = this.state !== null ? this.state.data : null;
        var apps = [];

        if(data !== null) {
            apps = data.apps
        }

        var iconStyle = {
            width: 96
        }
        return (
            <div className="row panel">
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
                        Object.keys(apps).map( (field, i) => {
                            var app = data.apps[i]
                            return(
                                <tr>
                                    <td><img src={app.icon} style={iconStyle}/></td>
                                    <td><h4> <a href={app.urlPath}>{app.name}</a></h4></td>
                                    <td>{app.description}</td>
                                    <td><a href={app.url} target="_blank">URL</a></td>
                                    <td><a href={app.shortUrl} target="_blank">Short URL</a></td>
                                    <td>
                                        <DatePickerInput date={new Date(app.createdAt)}  />
                                    </td>
                                    <td>{app.createdBy}</td>
                                    <td>{app.status}</td>
                                    <td>
                                        <label>{app.votesCount}</label>
                                        <div>
                                            <button  className="btn btn-success" onClick={this.vote.bind(this, app._id)} >
                                                <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                            </button>
                                            <button  className="btn btn-danger" onClick={this.unvote.bind(this, app._id)}>
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
            </div>
        );
    }
}