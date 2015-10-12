'use strict';

import React from 'react';
var ReactBootstrap = require('react-bootstrap')
var Button = ReactBootstrap.Button
var Link = require('react-router').Link
import {DateUtils} from '../../utils/DateUtils.js'
import {AddUserCollection} from './Add/AddUserCollection.jsx'
import {UserCollectionsAPI} from '../../api/UserCollectionsAPI.js'
import {UserCollectionsStore} from '../../stores/UserCollectionsStore.js'
import {UsersAPI} from '../../api/UsersAPI.js'

export default class UserCollection extends React.Component {
    constructor(props) {
        super(props);
        UsersAPI.getUsers(null, null, null, null)
        this.getUsersCollection = this.getUsersCollection.bind(this);
        this._onLoadUserCollection = this._onLoadUserCollection.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        UserCollectionsAPI.getCollection(props.params.collectionId)

        this.state = {
            data: {
                name: "",
                usersDetails: []
            }
        }
    }

    componentDidMount() {
        UserCollectionsStore.addLoadUserCollectionListener(this._onLoadUserCollection);
    }

    componentWillUnmount() {
        UserCollectionsStore.removeLoadUserCollectionListener(this._onLoadUserCollection);
    }

    _onLoadUserCollection() {
        this.setState({data: UserCollectionsStore.getUserCollection()})
    }

    getUsersCollection() {
        return this.data
    }

    _removeUser(userDetailsId) {
        let collectionId = this.props.params.collectionId
        UserCollectionsAPI.removeUser(collectionId, userDetailsId)
    }

    render() {
        var users = this.state.data.usersDetails;
        var collection = this.state.data;

        return (
            <div>
                <h3>
                    {this.state.data.name}
                </h3>
                <div><img src={collection.picture} width={150}/></div>
                <table className="table table-bordered table-hover panel-body">
                    <thead>
                    <tr>
                        <td>Picture</td>
                        <td>Name</td>
                        <td>Score</td>
                        <td>Apps</td>
                        <td>Comments</td>
                        <td>Collections</td>
                        <td>Votes</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(users).map((index, user) => {
                            var details = users[index]
                            console.log(details.user)
                            let loginType = details.user.loginType
                            let twitterHref = loginType =="twitter" ? "https://twitter.com/" + details.user.username : ""
                            return (
                                <tr>
                                    <td>
                                        <img src={details.user.profilePicture} width={50} />
                                    </td>
                                    <td>
                                        {details.user.name}
                                        <br />
                                        ({loginType})
                                        <div>
                                            <a href={twitterHref} target="_blank"><span className="glyphicon glyphicon-comment"></span></a>
                                        </div>
                                    </td>
                                    <td>
                                        {details.score}
                                    </td>
                                    <td>
                                        {details.addedApps}
                                    </td>
                                    <td>
                                        {details.comments}
                                    </td>
                                    <td>
                                        {details.collections}
                                    </td>
                                    <td>
                                        {details.votes}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" style={{marginRight: 10}} onClick={this._removeUser.bind(this, details._id)}>Remove</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }

}