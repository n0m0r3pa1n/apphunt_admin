'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var OverlayMixin = ReactBootstrap.OverlayMixin
var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal

import {NotificationsStore} from '../../../stores/NotificationsStore.js'
import {NotificationsAPI} from '../../../api/NotificationsAPI.js'

var $ = require('jquery')

export var ConfirmNotificationModal = React.createClass({
    getInitialState() {
        return {
            isModalOpen: true
        };
    },

    handleToggle() {
        this.props.onModalToggle(!this.state.isModalOpen)
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    _sendNotification() {
        this.props.onSave()
    },

    componentDidMount() {
        NotificationsStore.addChangeListener(this._onChange)
    },

    componentWillUnmount() {
        NotificationsStore.removeChangeListener(this._onChange)
    },

    _onChange(data) {
        this.handleToggle()
    },

    render() {
        let isModalOpen = this.state.isModalOpen;
        if (!isModalOpen) {
            return <span/>;
        }

        return (
            <Modal bsStyle='primary' title='Send notification' onRequestHide={this.handleToggle}>
                <form>
                    <div className="modal-content">
                        <div className="modal-body">
                            Are you sure you want to send notification to the selected users?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary save_app" data-dismiss="modal" onClick={this._sendNotification}>Save</button>
                            <Button onClick={this.handleToggle}>Close</Button>
                        </div>
                    </div>
                </form>
            </Modal>
        );
    }
})