'use strict';

import React from 'react';
var ReactBootstrap = require('react-bootstrap')
var Button = ReactBootstrap.Button
import {DateUtils} from '../../../utils/DateUtils.js'
import AddedAppsList from './AddedAppsList.jsx'
import {SearchForm} from './SearchForm.jsx'
import SearchResultsList from './SearchResultsList.jsx'
import {AppCollectionsAPI} from '../../../api/AppCollectionsAPI.js'
import {AppCollectionsStore} from '../../../stores/AppCollectionsStore.js'

var Select = require('react-select');
var DatePickerInput = require('react-datepicker-component/DatePickerInput.jsx')

export default class CollectionDetails extends React.Component {

    constructor(props) {
        super(props);
        this.collectionId = props.params.collectionId
        this.setAppsCollection = this.setAppsCollection.bind(this);
        this._onLoadAppCollection = this._onLoadAppCollection.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        console.log("CollectionDetails constructor");
        AppCollectionsAPI.getCollection(this.collectionId);
    }

    componentWillMount() {
        console.log("componentWillMount");
        AppCollectionsStore.addLoadAppCollectionListener(this._onLoadAppCollection);
    }

    componentWillUnmount() {
        AppCollectionsStore.removeLoadAppCollectionListener(this._onLoadAppCollection);
    }

    _onLoadAppCollection(data) {
        console.log("CHNANGE")
        this.setAppsCollection(AppCollectionsStore.getAppCollection())
    }

    setAppsCollection(data) {
        this.data = data;
        this.setState({data: data})
    }

    render() {
        console.log("RENDER")
        var collection = {};
        var collectionId = "";
        var apps = []
        var data = this.state !== null ? this.state.data : null;
        if (data !== null) {
            console.log("COLLECTION")
            collection = data.collection
            collectionId = collection._id
            apps = collection.apps
            console.log("Collection: " )
            console.log(collection.apps)
        }

        return (
            <div>
                <div className="col-lg-6">
                    <div className="col-lg-12">
                        <h4>{collection.name}</h4>
                        <img src={collection.picture}/>
                    </div>
                    <div className="col-lg-12">
                        <h3>Apps</h3>
                        <AddedAppsList apps={collection.apps}/>
                    </div>
                </div>
                <div className="col-lg-6" style={{borderLeft: "1px solid black"}}>
                    <SearchForm />
                    <SearchResultsList collectionId={collectionId} />
                </div>

            </div>
        );
    }
}