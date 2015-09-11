'use strict';

import React from 'react';

var ReactBootstrap =  require('react-bootstrap')
var Select = require('react-select');
var Button = ReactBootstrap.Button

import {PAGE_SIZE} from '../../config/config.js'
import {UsersStore} from '../../stores/UsersStore.js'
import {UsersAPI} from '../../api/UsersAPI.js'

export default class SearchUsersForm extends React.Component {
    constructor(props) {
        super(props);
        UsersAPI.getLoginTypes()
        this.currentLoginType = "real"
        this.state = {
            loginTypes: []
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this._onChange = this._onChange.bind(this)
        this._onLoginTypeChange = this._onLoginTypeChange.bind(this)
        this._searchUsers = this._searchUsers.bind(this)
    }

    componentDidMount() {
        UsersStore.addLoginTypesListener(this._onChange)
    }

    componentWillUnmount() {
        UsersStore.removeLoginTypesListener(this._onChange)
    }

    _onChange() {
        this.setState({
            loginTypes: UsersStore.getLoginTypes()
        })
    }

    _onLoginTypeChange(selectedOption) {
        this.currentLoginType = selectedOption;
    }

    _searchUsers() {
        let query = React.findDOMNode(this.refs.query).value
        this.props.onSearch(query, this.currentLoginType)
    }

    render() {
        var loginTypes = this.state.loginTypes
        var options = []
        for(let type of loginTypes) {
            options.push({value: type, label: type})
        }

        return (
            <div className="col-md-offset-1 col-lg-12 panel-heading">
                <div className="form-inline">
                    <div className="input-group-lg col-lg-">
                        <Select
                            name="platform"
                            className="col-md-2"
                            value={this.currentLoginType}
                            options={options}
                            onChange={this._onLoginTypeChange}
                            />
                        <input className="form-control col-md-4" type="text" ref="query" placeholder="Enter name, username or email"/>
                        <Button onClick={this._searchUsers} bsStyle='primary'>Search</Button>
                    </div>
                </div>
            </div>);
    }
}