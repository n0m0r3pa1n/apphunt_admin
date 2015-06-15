'use strict';

import React from 'react';
import {StatsActions} from '../../actions/stats/StatsActions.js'
var DatePicker = require('react-datepicker')
var moment = require('moment')

export default class StatsDatePicker extends React.Component {
    constructor() {
        super();
        this.onFromDateChange = this.onFromDateChange.bind(this)
        this.onToDateChange = this.onToDateChange.bind(this)
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.state = {
            fromDate: moment(),
            toDate: moment()
        }
    }

    onSearchSubmit() {
        let fromDate = this.state.fromDate
        let toDate = this.state.toDate

        StatsActions.changeStatsPeriod(
            {
                fromDate: fromDate,
                toDate: toDate
            })
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

    render() {
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
                <div className="col-md-2">
                    <button className="btn btn-default" onClick={this.onSearchSubmit}>Search</button>
                </div>

            </div>
        );
    }
}