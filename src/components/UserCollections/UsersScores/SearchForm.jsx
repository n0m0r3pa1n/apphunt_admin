'use strict';

import React from 'react';
var ReactBootstrap = require('react-bootstrap')
var Button = ReactBootstrap.Button
import {UsersAPI} from '../../../api/UsersAPI.js'
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
        let loginType = React.findDOMNode(this.refs.type).value;

        var from = this.state.fromDate != null ? this.state.fromDate.toDate() : null;
        var to = this.state.toDate != null ? this.state.toDate.toDate() : null;

        UsersAPI.getUsersScores(from, to, loginType)
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
                        <select ref="type">
                            <option defaultValue>all</option>
                            <option>fake</option>
                            <option>real</option>
                        </select>
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