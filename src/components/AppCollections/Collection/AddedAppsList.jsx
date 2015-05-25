'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var Button = ReactBootstrap.Button
import {AppCollectionsStore} from '../../../stores/AppCollectionsStore.js'
import {DateUtils} from '../../../utils/DateUtils.js'

export default class AddedAppsList extends React.Component {
    constructor() {
        super();
        //this.apps = props.apps
        //this.apps = []
        this._onLoadCollection = this._onLoadCollection.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentWillMount() {
        console.log("AddedAppsList componentWillMount");
        AppCollectionsStore.addLoadAppCollectionListener(this._onLoadCollection);
    }

    componentWillUnmount() {
        AppCollectionsStore.removeLoadAppCollectionListener(this._onLoadCollection);
    }

    _onLoadCollection(data) {
        console.log("CHNANGE AddedAppsList")
        this.data = data;
        this.setState({data: AppCollectionsStore.getAppCollection()})
    }

    render() {
        var data = this.state !== null ? this.state.data : null;
        var apps = new Array();

        if(data !== null && data !== undefined) {
            apps = data.apps
        }

        if(apps == null || apps==undefined) {
            apps = []
        }

        var iconStyle = {
            width: 96
        }

        console.log("APPS", apps)
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
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {

                        Object.keys(apps).map( (field, i) => {
                            let app = apps[i]
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
                                        <img src="./img/ic_comment.png" width="16px"/>
                                        <span>{app.commentsCount}</span>
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
                                    <td className="col-md-2">
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