'use strict';

import React from 'react';
import {ConfirmNotification} from '../Users/Notifications/ConfirmNotification.js'
import {UsersStore} from '../../stores/UsersStore.js'
import {NotificationsStore} from '../../stores/NotificationsStore.js'
import {NotificationsAPI} from '../../api/NotificationsAPI.js'
import {UsersList} from '../Users/UsersList.jsx'
import SearchUsersForm from '../../components/Users/SearchUsersForm.jsx'
var Select = require('react-select');



var defaultState = {
    data: [],
    query: "",
    loginType: "real",
    reset: true
}

export default class Users extends React.Component {
    constructor() {
        super();
        NotificationsAPI.getNotificationTypes()
        this._onChange = this._onChange.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this._onTypeChange = this._onTypeChange.bind(this)
        this._onSave = this._onSave.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.state = defaultState
    }
    componentDidMount() {
        NotificationsStore.addChangeListener(this._onChange);
        UsersStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        NotificationsStore.removeChangeListener(this._onChange);
        UsersStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        defaultState.data = NotificationsStore.getTypes()
        this.setState(defaultState)
    }

    _onTypeChange(type) {
        this.type = type
    }

    _onSave() {
        let type =  this.type
        let title = React.findDOMNode(this.refs.title).value
        let message = React.findDOMNode(this.refs.message).value
        let image = React.findDOMNode(this.refs.image).value
        let selectedUserIds = this.refs['UserList'].getSelectedUserIds()

        NotificationsAPI.sendNotifications(selectedUserIds, title, message, image, type)
    }

    onSearch(query, loginType) {
        defaultState.query = query
        defaultState.loginType = loginType
        this.setState(defaultState)
        this.refs['UserList'].updateState()
    }

    render() {
        var data = this.state !== null ? this.state.data : []
        var options = []
        for(var i=0; i < data.length; i++) {
            var type = data[i]
            options.push({value: type, label: type})
        }

        this.type = data.length == 0 ? '' : data[0]
        return <div>
            <div className="form-group">
                <Select
                    ref="type"
                    name="type"
                    value={this.type}
                    options={options}
                    onChange={this._onTypeChange}
                    />
            </div>
            <div className="form-group">
                <label>Title</label>
                <input type="text" ref="title" className="form-control" required="required" pattern="[A-Za-z0-9]{1,20}"/>
            </div>
            <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" ref="message" required="required" pattern="[A-Za-z0-9]{1,20}"
                                      maxLength="100" ></textarea>
            </div>
            <div className="form-group">
                <label>Image</label>
                <input type="text" ref="image" className="form-control"/>
            </div>
            <ConfirmNotification onSave={this._onSave}/>
            <SearchUsersForm onSearch={this.onSearch.bind(this)} />
            <UsersList ref="UserList" query={this.state.query} loginType={this.state.loginType} />
        </div>

    }
}
