'use strict';

import React from 'react';
import {AppsStore} from '../../stores/AppsStore.js'
import {AppsAPI} from '../../api/AppsAPI.js'
import {DateUtils} from '../../utils/DateUtils.js'

var $ = require('jquery')
var Select = require('react-select');
var DatePicker = require('react-datepicker')
import {AddApp} from '../App/Add/AddApp.jsx'

var moment = require('moment')

var options = [
    { value: 'all', label: 'All'},
    { value: 'approved', label: 'Approved'},
    { value: 'waiting', label: 'Waiting' },
    { value: 'rejected', label: 'Rejected' }
];

export default class SearchForm extends React.Component {
    constructor() {
        super();
        this.currentPlatform = "Android"
        this.currentStatus = "all"
        this.shouldFilterAllApps = false;
        this.currentDate = moment()
        this.state = {
            selectedDate: this.currentDate
        };

        this._onPlatformChange = this._onPlatformChange.bind(this);
        this._onStatusChange = this._onStatusChange.bind(this);
        this._onDateChange = this._onDateChange.bind(this);
        this._shouldShowAllApps = this._shouldShowAllApps.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    _onPlatformChange(event) {
        this.currentPlatform = event.target.value;
        this._getApps()
    }

    _onStatusChange(status) {
        if(status === "") {
            return;
        }

        this.currentStatus = status;
        this._getApps()
    }
    _onDateChange(date) {
        this.currentDate = date
        this.setState({
            selectedDate: date
        })
        this._getApps()
    }

    _shouldShowAllApps(event) {
        this.shouldFilterAllApps = event.target.checked
        this._getApps()
    }

    _getApps() {
        let date = this.currentDate.toDate();
        if(this.shouldFilterAllApps == true) {
            date = ""
        }
        AppsAPI.getAppsWithoutCallback(date, this.currentPlatform, this.currentStatus, 40, 1);
    }

    render() {

        return (
            <div className="col-md-offset-1 col-lg-12 panel-heading">
                <div className="form-inline">
                    <div className="input-group-lg col-lg-2">
                        <form>
                            <input type="radio" name="platform" value="Android" defaultChecked onChange={this._onPlatformChange} />
                            <label> Android</label>
                            <input type="radio" name="platform" value="iOS" onChange={this._onPlatformChange} />
                            <label> iOS</label>
                        </form>
                    </div>
                    <div className="input-group-lg col-md-2">
                        <DatePicker selected={this.state.selectedDate} onChange={this._onDateChange} />
                    </div>
                    <div className="input-group-lg col-lg-1">
                        <label>All apps: <input type="checkbox" onChange={this._shouldShowAllApps}/></label>
                    </div>
                    <div className="input-group-lg col-lg-2">
                        <Select
                            name="platform"
                            value={this.currentStatus}
                            options={options}
                            onChange={this._onStatusChange}
                            />
                    </div>
                    <div className="input-group-lg col-lg-3">
                        <AddApp />
                    </div>
                </div>
            </div>);
    }
}