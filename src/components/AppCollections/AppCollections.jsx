'use strict';

import React from 'react';
var ReactBootstrap = require('react-bootstrap')
var Button = ReactBootstrap.Button
var Link = require('react-router').Link
import {DateUtils} from '../../utils/DateUtils.js'
import {AddAppCollection} from './Add/AddAppCollection.jsx'
import {AppCollectionsAPI} from '../../api/AppCollectionsAPI.js'
import {AppCollectionsStore} from '../../stores/AppCollectionsStore.js'

export default class AppCollections extends React.Component {

    constructor() {
        super();
        this.setAppsCollections = this.setAppsCollections.bind(this);
        this.getAppsCollections = this.getAppsCollections.bind(this);
        this._onChange = this._onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        AppCollectionsAPI.getCollections(1, 100)
    }

    componentDidMount() {
        AppCollectionsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppCollectionsStore.removeChangeListener(this._onChange);
    }

    _onChange(data) {
        this.setAppsCollections(AppCollectionsStore.getAppCollections())
    }

    setAppsCollections(data) {
        this.data = data;
        this.setState({data: data})
    }
    getAppsCollections() {
        return this.data
    }


    render() {
        var collections = [];
        var data = this.state !== null ? this.state.data : null;
        if(data !== null) {
            collections = data.collections
        }
        return (
            <div>
                <AddAppCollection/>

                <div className="row panel">
                    <table className="table table-bordered table-hover panel-body" id="collections_table">
                        <thead>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Created By</th>
                            <th>Votes</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(collections).map((field, i) => {
                                let collection = data.collections[i]
                                return (
                                    <tr>
                                        <td><img src={collection.picture}/></td>
                                        <td>
                                            <h4><Link to="app-collection" params={{collectionId: collection._id}}>{collection.name}</Link></h4>
                                        </td>
                                        <td className="col-md-4">{collection.description}</td>
                                        <td className="col-md-1">
                                            {DateUtils.formatDate(new Date(collection.createdAt))}
                                        </td>
                                        <td>
                                            {collection.createdByName}
                                        </td>
                                        <td >
                                            <label>{collection.votesCount}</label>
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
            </div>
        );
    }
}