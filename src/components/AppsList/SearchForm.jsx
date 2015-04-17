'use strict';

import React from 'react';
import {AppsStore} from '../../stores/AppsStore.js'
import {AppsAPI} from '../../api/AppsAPI.js'
import {DateUtils} from '../../utils/DateUtils.js'

var $ = require('jquery')
var Select = require('react-select');
var DatePickerInput = require('react-datepicker-component/DatePickerInput.jsx')
import {AddApp} from '../App/Add/AddApp.jsx'

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
        this.currentDate = new Date()
        this.shouldFilterAllApps = false;

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
        this.currentDate = date;
        this._getApps()
    }

    _shouldShowAllApps(event) {
        this.shouldFilterAllApps = event.target.checked
        this._getApps()
    }

    _getApps() {
        let date = this.currentDate;
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
                        <DatePickerInput date={this.currentDate}  dateFormatter={DateUtils.formatDate} onChangeDate={this._onDateChange}/>
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