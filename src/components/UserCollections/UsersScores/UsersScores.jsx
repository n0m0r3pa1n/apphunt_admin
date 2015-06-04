'use strict';

import React from 'react';
var ReactBootstrap = require('react-bootstrap')
var Button = ReactBootstrap.Button
var Link = require('react-router').Link
import {DateUtils} from '../../../utils/DateUtils.js'
import {AddUserCollection} from './../Add/AddUserCollection.jsx'
import {UserCollectionsAPI} from '../../../api/UserCollectionsAPI.js'
import {UserCollectionsStore} from '../../../stores/UserCollectionsStore.js'
import {SearchForm} from './SearchForm.jsx'

export default class UsersScores extends React.Component {

    constructor() {
        super();
        //this.setUsersCollections = this.setUsersCollections.bind(this);
        //this.getUsersCollections = this.getUsersCollections.bind(this);
        //this._onLoadUserCollections = this._onLoadUserCollections.bind(this);
        //this.componentDidMount = this.componentDidMount.bind(this);
        //this.componentWillUnmount = this.componentWillUnmount.bind(this);
        //UserCollectionsAPI.getCollections(1, 100)
    }

    componentDidMount() {
        //UserCollectionsStore.addLoadUserCollectionsListener(this._onLoadUserCollections);
    }

    componentWillUnmount() {
        //UserCollectionsStore.removeLoadUserCollectionsListener(this._onLoadUserCollections);
    }

    _onLoadUserCollections(data) {
        //this.setUsersCollections(UserCollectionsStore.getUserCollections())
    }

    setUsersCollections(data) {
        //this.data = data;
        //this.setState({data: data})
    }

    getUsersCollections() {
        //return this.data
    }


    render() {

        return (
            <div>
                <SearchForm />
                AAAAA
            </div>
        )
    }

}