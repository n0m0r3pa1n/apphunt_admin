'use strict';

import React from 'react';
var ReactBootstrap = require('react-bootstrap')
var Button = ReactBootstrap.Button
import {AppsStore} from '../../../stores/AppsStore.js'
import {AppsAPI} from '../../../api/AppsAPI.js'
import {DateUtils} from '../../../utils/DateUtils.js'

var $ = require('jquery')
var Select = require('react-select');
var DatePicker = require('react-datepicker')

var moment = require('moment')

export var SearchForm = React.createClass({
    getInitialState() {
        return {
            fromDate: null,
            toDate: null
        };
    },

    search() {
        let platform = React.findDOMNode(this.refs.platform).value;
        let query = React.findDOMNode(this.refs.query).value;

        var from = this.state.fromDate != null ? this.state.fromDate.toDate() : null;
        var to = this.state.toDate != null ? this.state.toDate.toDate() : null;

        AppsAPI.searchApps(query, from, to, platform, 1, 50, "approved");
    },

    onFromChangeDate(date) {
        this.setState({
            fromDate: date
        });
    },

    onToChangeDate(date) {
        this.setState({
            toDate: date
        });
    },

    render() {

        return (
            <div className="col-lg-12">
                <div className="form-inline col-lg-12">
                    <div className="input-group-lg col-lg-4">
                        <select ref="platform">
                            <option defaultValue>Android</option>
                            <option>iOS</option>
                        </select>
                    </div>
                    <div className="input-group-lg col-md-8">
                        <input type="text" ref="query" placeholder="Name"/>
                    </div>

                </div>
                <div className="form-inline ">
                    <div className="input-group-lg col-md-4">
                        <label>From:</label>
                        <DatePicker selected={this.state.fromDate} onChange={this.onFromChangeDate}/>
                    </div>
                    <div className="input-group-lg col-md-4">
                        <label>To:</label>
                        <DatePicker selected={this.state.toDate} onChange={this.onToChangeDate}/>
                    </div>
                    <div className="input-group-lg col-md-4">
                        <Button onClick={this.search} bsStyle='primary' style={{marginLeft: 10}}>Search</Button>
                    </div>
                </div>
            </div>);
    }
})