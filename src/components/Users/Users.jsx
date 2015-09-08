'use strict';

import React from 'react';
import {ConfirmNotification} from '../Users/Notifications/ConfirmNotification.js'
import {NotificationsStore} from '../../stores/NotificationsStore.js'
import {NotificationsAPI} from '../../api/NotificationsAPI.js'
var Select = require('react-select');

export default class Users extends React.Component {
    constructor() {
        super();
        NotificationsAPI.getNotificationTypes()
        this._onChange = this._onChange.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillUnmount = this.componentWillUnmount.bind(this)
        this._onTypeChange = this._onTypeChange.bind(this)
        this._onSave = this._onSave.bind(this)
    }
    componentDidMount() {
        NotificationsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        NotificationsStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({data: NotificationsStore.getTypes()})
    }

    _onTypeChange(type) {
        this.type = type
    }

    _onSave() {
        let type =  this.type
        let title = React.findDOMNode(this.refs.title).value
        let message = React.findDOMNode(this.refs.message).value
        let image = React.findDOMNode(this.refs.image).value

        NotificationsAPI.sendNotifications([], title, message, image, type)
    }

    render() {
        var data = this.state !== null ? this.state.data : []
        var options = []
        for(let type of data) {
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
        </div>

    }
}
