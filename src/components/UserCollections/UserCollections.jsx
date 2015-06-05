'use strict';

import React from 'react';
var ReactBootstrap = require('react-bootstrap')
var Button = ReactBootstrap.Button
var Link = require('react-router').Link
import {DateUtils} from '../../utils/DateUtils.js'
import {AddUserCollection} from './Add/AddUserCollection.jsx'
import {UserCollectionsAPI} from '../../api/UserCollectionsAPI.js'
import {UserCollectionsStore} from '../../stores/UserCollectionsStore.js'

export default class UserCollections extends React.Component {

    constructor() {
        super();
        this.setUsersCollections = this.setUsersCollections.bind(this);
        this.getUsersCollections = this.getUsersCollections.bind(this);
        this._onLoadUserCollections = this._onLoadUserCollections.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        UserCollectionsAPI.getCollections(1, 100)
    }

    componentDidMount() {
        UserCollectionsStore.addLoadUserCollectionsListener(this._onLoadUserCollections);
    }

    componentWillUnmount() {
        UserCollectionsStore.removeLoadUserCollectionsListener(this._onLoadUserCollections);
    }

    _onLoadUserCollections(data) {
        this.setUsersCollections(UserCollectionsStore.getUserCollections())
    }

    setUsersCollections(data) {
        this.data = data;
        this.setState({data: data})
    }

    getUsersCollections() {
        return this.data
    }


    render() {
        var collections = [];
        var data = this.state !== null ? this.state.data : null;
        if (data !== null) {
            collections = data.collections
        }
        return (
            <div>
                <AddUserCollection/>
                <Button style={{marginLeft: "20"}} bsStyle='primary'>
                    <Link to="user-scores" style={{color: "white"}}>Users Scores</Link></Button>

                <div className="row panel">
                    <table className="table table-bordered table-hover panel-body" id="collections_table">
                        <thead>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created At</th>
                            <th>Created By</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Object.keys(collections).map((field, i) => {
                                let collection = data.collections[i]
                                return (
                                    <tr>
                                        <td><img src={collection.picture} width={150}/></td>
                                        <td>
                                            <h4><Link to="user-collection" params={{collectionId: collection._id}}>{collection.name}</Link></h4>
                                        </td>
                                        <td className="col-md-4">{collection.description}</td>
                                        <td className="col-md-1">
                                            {DateUtils.formatDate(new Date(collection.createdAt))}
                                        </td>
                                        <td>
                                            {collection.createdByName}
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
        )
    }

}