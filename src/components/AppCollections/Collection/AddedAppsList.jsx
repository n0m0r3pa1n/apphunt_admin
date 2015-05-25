'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var Button = ReactBootstrap.Button

import {DateUtils} from '../../../utils/DateUtils.js'

export default class AddedAppsList extends React.Component {
    constructor(props) {
        super(props);
        this.apps = props.apps
        this.apps = []
        //this._onLoadAppCollection = this._onLoadAppCollection.bind(this);
        //this.componentWillMount = this.componentWillMount.bind(this);
        //this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    //componentWillMount() {
    //    console.log("AddedAppsList componentWillMount");
    //    AppCollectionsStore.addLoadAppCollectionListener(this._onLoadAppCollection);
    //}
    //
    //componentWillUnmount() {
    //    AppCollectionsStore.removeLoadAppCollectionListener(this._onLoadAppCollection);
    //}
    //
    //_onLoadAppCollection(data) {
    //    console.log("CHNANGE AddedAppsList")
    //    this.props = AppCollectionsStore.getAppCollection().apps
    //}

    render() {
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
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {

                        Object.keys(this.apps).map( (field, i) => {
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