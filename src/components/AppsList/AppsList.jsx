'use strict';

import React from 'react';
import {AppsStore} from '../../stores/AppsStore.js'
import {VotesAPI} from '../../api/VotesAPI.js'
import {SearchForm} from './SearchForm.jsx'
import AppActions from '../App/AppActions.jsx'

import {DateUtils} from '../../utils/DateUtils.js'
var Link = require('react-router').Link

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
                        Object.keys(apps).map((field, i) => {
                            let app = data.apps[i]
                            let commentsPath = '#/comments/' + app._id
                            let userType = app.creatorType != 'fake' ? '('+ app.creatorType +')' : ''
                            let mailTo = app.createdByMail !== '' ? <a href={'mailto:' + app.createdByMail}><span className="glyphicon glyphicon-envelope"></span></a> : ""
                            let twitterHref = "https://twitter.com/" + app.createdBy
                            let twitterLink = app.creatorType != 'fake' ?
                                <a href={twitterHref} target="_blank"><span className="glyphicon glyphicon-comment"></span></a> :
                                <div></div>
                            return(
                                <tr>
                                    <td><img src={app.icon} style={iconStyle}/></td>
                                    <td>
                                        <h4><Link to="comments" params={{appId: app._id}} query={{appName: app.name, appIcon: app.icon}}>{app.name}</Link>
                                            </h4>
                                        <img src="./img/ic_comment.png" width="16px"/>
                                        <span>{app.commentsCount}</span>
                                    </td>
                                    <td className="col-md-4">{app.description}</td>
                                    <td><a href={app.url} target="_blank">URL</a></td>
                                    <td><a href={app.shortUrl} target="_blank">Short URL</a></td>
                                    <td className="col-md-1">
                                        {DateUtils.formatDate(new Date(app.createdAt))}
                                    </td>
                                    <td>
                                        {app.createdBy}
                                        <br />
                                        {userType}
                                        <br />
                                        <img src={app.createdByPicture} width={40} />
                                        <br />
                                        {twitterLink} {mailTo} </td>
                                    <td>{app.status}</td>
                                    <td >
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
                                    <td className="col-md-2">
                                        <AppActions app={app} />
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