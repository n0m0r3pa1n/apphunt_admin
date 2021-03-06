'use strict';

import React from 'react';
var moment = require('moment')
var DatePicker = require('react-datepicker')
var Select = require('react-select');

import {StatsStore} from  '../../stores/Stats/StatsStore.js'
import {StatsActions} from '../../actions/stats/StatsActions.js'
import {UserStatsStore} from '../../stores/Stats/UserStatsStore.js'
import {StatsAPI} from '../../api/Stats/StatsAPI.js'
import {UserStatsAPI} from '../../api/Stats/UserStatsAPI.js'
import {DateUtils} from '../../utils/DateUtils.js'


export default class StatsSearchPicker extends React.Component {
    constructor() {
        super();
        this.onFromDateChange = this.onFromDateChange.bind(this)
        this.onToDateChange = this.onToDateChange.bind(this)
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.onVersionChange = this.onVersionChange.bind(this)
        this.onChange = this.onChange.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this.version = "all"
        this.state = {
            fromDate: moment(),
            toDate: moment(),
            versions: []
        }
        //this.onSearchSubmit();
    }

    componentDidMount() {
        StatsStore.addChangeListener(this.onChange)
        StatsAPI.getAppVersions();
    }

    componentWillUnmount() {
        StatsStore.removeChangeListener(this.onChange)
    }

    onChange() {
        var data = StatsStore.getAppVersions();
        var versions = []
        versions.push({value: "all", label: "all"})
        for(let version of data) {
            versions.push({value: version["@name"], label: version["@name"]})
        }
        this.setState({
            versions: versions
        })
    }


    onSearchSubmit() {
        let fromDate = this.state.fromDate
        let toDate = this.state.toDate
        let version = this.version
        let eventName = React.findDOMNode(this.refs.eventName).value;

        UserStatsAPI.getEventDetails(DateUtils.formatDate(fromDate.toDate()), DateUtils.formatDate(toDate.toDate()), eventName, version)
    }

    onFromDateChange(date) {
        this.setState({
            fromDate: date
        })
    }

    onToDateChange(date) {
        this.setState({
            toDate: date
        })
    }

    onVersionChange(version) {
        this.version = version
    }

    render() {
        var options = this.state.versions;
        return (
            <div className="row">
                <div className="col-md-3">
                    <label className="col-md-4">From date:</label>
                    <DatePicker selected={this.state.fromDate} onChange={this.onFromDateChange}/>
                </div>

                <div className="col-md-3">
                    <label className="col-md-3">To date:</label>
                    <DatePicker selected={this.state.toDate} onChange={this.onToDateChange}/>
                </div>
                <div className="col-md-3">
                    <label className="col-md-3">Event name:</label>
                    <input type="text" ref="eventName" placeholder="Name" value="user.opened.app.in.market" />
                </div>

                <div className="col-md-3">
                    <label className="col-md-3">Version:</label>
                    <Select
                        name="platform"
                        value={this.version}
                        options={options}
                        onChange={this.onVersionChange}
                        />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-default" onClick={this.onSearchSubmit}>Search</button>
                </div>

            </div>
        );
    }
}