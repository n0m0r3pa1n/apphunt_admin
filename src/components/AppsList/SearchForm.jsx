'use strict';

import React from 'react';
import {AppsStore} from '../../stores/AppsStore.js'
import {AppsAPI} from '../../api/AppsAPI.js'
import {DateUtils} from '../../utils/DateUtils.js'

var Select = require('react-select');
var DatePickerInput = require('react-datepicker-component/DatePickerInput.jsx')

var options = [
    { value: 'All', label: 'All'},
    { value: 'Approved', label: 'Approved'},
    { value: 'Waiting', label: 'Waiting' },
    { value: 'Rejected', label: 'Rejected' }
];

export default class SearchForm extends React.Component {
    constructor() {
        super();
        this.currentPlatform = "Android"
        this.currentDate = new Date()
        this._onPlatformChange = this._onPlatformChange.bind(this);
        this._onStatusChange = this._onStatusChange.bind(this);
        this._onDateChange = this._onDateChange.bind(this);
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

        console.log(this.currentPlatform)
    }
    _onDateChange(date) {
        console.log(DateUtils.formatDate(date))
        this.currentDate = date;
        this._getApps()
    }

    _getApps() {
        AppsAPI.getAppsWithoutCallback(this.currentDate, this.currentPlatform, "all", 100, 1);
    }

    render() {
        return (
            <div className="col-md-offset-1 col-lg-10 panel-heading">
                <div className="form-inline">
                    <div className="input-group-lg col-lg-2">
                        <form>
                            <input type="radio" name="platform" value="Android" defaultChecked onChange={this._onPlatformChange} />
                            <label> Android</label>
                            <input type="radio" name="platform" value="iOS" onChange={this._onPlatformChange} />
                            <label> iOS</label>
                        </form>
                    </div>
                    <div className="input-group-lg col-lg-3">
                        <label>Date: <DatePickerInput date={this.currentDate}  dateFormatter={DateUtils.formatDate} onChangeDate={this._onDateChange}/></label>
                    </div>
                    <div className="input-group-lg col-lg-4">
                        <Select
                            name="platform"
                            value="All"
                            options={options}
                            onChange={this._onStatusChange}
                            />
                    </div>
                    <button id="get_apps" className="btn btn-primary">
                        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                    </button>
                    <button id="add_app" className="btn btn-success">
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                    </button>
                </div>
            </div>);
    }
}