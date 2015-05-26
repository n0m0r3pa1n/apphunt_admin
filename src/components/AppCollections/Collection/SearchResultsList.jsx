'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var Button = ReactBootstrap.Button

import {DateUtils} from '../../../utils/DateUtils.js'
import {AppsStore} from '../../../stores/AppsStore.js'
import AppsList from '../../AppsList/AppsList.jsx'

import {AppCollectionsAPI} from '../../../api/AppCollectionsAPI.js'

export default class SearchResultsList extends AppsList {
    constructor(props) {
        super(props);
        this.collectionId = props.collectionId
    }

    addToCollection(appId) {
        AppCollectionsAPI.addAppsInCollection(this.collectionId, [appId])
    }

    render() {
        var data = this.state !== null ? this.state.data : null;
        var apps = new Array();

        if(data !== null && data.apps !== undefined && data !== undefined) {
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
                        <th>Created At</th>
                        <th>Created By</th>
                        <th>Votes</th>
                        <th>Add in Collection</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(apps).map((field, i) => {
                            let app = data.apps[i]
                            let userType = app.creatorType != 'fake' ? '(real)' : ''
                            let mailTo = app.createdByMail !== '' ? <a href={'mailto:' + app.createdByMail}><span className="glyphicon glyphicon-envelope"></span></a> : ""
                            let twitterHref = "https://twitter.com/" + app.createdBy
                            let twitterLink = app.creatorType != 'fake' ?
                                <a href={twitterHref} target="_blank"><span className="glyphicon glyphicon-comment"></span></a> :
                                <div></div>
                            return(
                                <tr>
                                    <td><img src={app.icon} style={iconStyle}/></td>
                                    <td>
                                        <h4>{app.name}</h4>
                                        <span>{app.commentsCount}</span>
                                        <img src="./img/ic_comment.png" width="16px"/>
                                    </td>
                                    <td className="col-md-4">{app.description}</td>
                                    <td><a href={app.url} target="_blank">URL</a></td>
                                    <td className="col-md-1">
                                        {DateUtils.formatDate(new Date(app.createdAt))}
                                    </td>
                                    <td>
                                        {app.createdBy}
                                        <br />
                                        {userType}
                                        <br />
                                        {twitterLink} {mailTo}
                                    </td>
                                    <td >
                                        <label>{app.votesCount}</label>
                                            <button  className="btn btn-success" onClick={this.vote.bind(this, app._id)} >
                                                <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                            </button>
                                            <button  className="btn btn-danger" onClick={this.unvote.bind(this, app._id)}>
                                                <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                                            </button>
                                    </td>
                                    <td className="col-md-2">
                                        <Button onClick={this.addToCollection.bind(this, app._id)} bsStyle='primary'><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></Button>
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