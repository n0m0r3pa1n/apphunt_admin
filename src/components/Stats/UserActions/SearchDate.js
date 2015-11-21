'use strict';

import React from 'react';
var moment = require('moment')
var DatePicker = require('react-datepicker')

export default class SearchDate extends React.Component {
    constructor() {
        super();
        this.onFromDateChange = this.onFromDateChange.bind(this)
        this.onToDateChange = this.onToDateChange.bind(this)

        this.state = {
            fromDate: moment(),
            toDate: moment()
        }
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

    getDates() {
        return {
            fromDate: this.fromDate,
            toDate: this.toDate
        }
    }

    render() {
        this.fromDate = this.state.fromDate
        this.toDate = this.state.toDate
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
            </div>
        );
    }
}