'use strict';

import React from 'react';
var ReactBootstrap = require('react-bootstrap')
var Button = ReactBootstrap.Button
import {DateUtils} from '../../../utils/DateUtils.js'
import AppsList from './AppsList.jsx'
//import {AddAppsButton} from './Add/AddAppsButton.jsx'
import {AppCollectionsAPI} from '../../../api/AppCollectionsAPI.js'
import {AppCollectionsStore} from '../../../stores/AppCollectionsStore.js'

var Select = require('react-select');
var DatePickerInput = require('react-datepicker-component/DatePickerInput.jsx')

export default class CollectionApps extends React.Component {

    constructor(props) {
        super(props);
        this.collectionId = props.params.collectionId
        this.setAppsCollection = this.setAppsCollection.bind(this);
        this.getAppsCollection = this.getAppsCollection.bind(this);
        this._onChange = this._onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);

        AppCollectionsAPI.getCollection(this.collectionId);
    }

    componentDidMount() {
        AppCollectionsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        AppCollectionsStore.removeChangeListener(this._onChange);
    }

    _onChange(data) {
        this.setAppsCollection(AppCollectionsStore.getAppCollection())
    }

    setAppsCollection(data) {
        this.data = data;
        this.setState({data: data})
    }

    getAppsCollection() {
        return this.data
    }


    render() {
        var collection = {};
        var data = this.state !== null ? this.state.data : null;
        if (data !== null) {
            collection = data.collection
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
                        <AppsList apps={collection.apps}/>
                    </div>
                </div>
                <div className="col-lg-6" style={{borderLeft: "1px solid black"}}>
                    <div className="form-inline col-lg-12">
                        <div className="input-group-lg col-lg-4">
                            <form>
                                <input type="radio" name="platform" value="Android" defaultChecked/>
                                <label style={{marginLeft: 5}}> Android</label>
                                <input type="radio" name="platform" value="iOS" onChange={this._onPlatformChange}
                                       style={{marginLeft: 5}}/>
                                <label style={{marginLeft: 5}}> iOS</label>
                            </form>
                        </div>
                        <div className="input-group-lg col-md-8">
                            <input type="text" name="search" placeholder="Name"/>
                        </div>

                    </div>
                    <div className="form-inline ">
                        <div className="input-group-lg col-md-4">
                            <label>From:</label>
                            <DatePickerInput date={this.currentDate} dateFormatter={DateUtils.formatDate}
                                             onChangeDate={this._onDateChange}/>
                        </div>
                        <div className="input-group-lg col-md-4">
                            <label>To:</label>
                            <DatePickerInput date={this.currentDate} dateFormatter={DateUtils.formatDate}
                                             onChangeDate={this._onDateChange}/>
                        </div>
                        <div className="input-group-lg col-md-4">
                            <Button onClick={this.handleToggle} bsStyle='primary' style={{marginLeft: 10}}>Search</Button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}