'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var OverlayMixin = ReactBootstrap.OverlayMixin
var Button = ReactBootstrap.Button
import {ConfirmNotificationModal} from './ConfirmNotificationModal.js'

export var ConfirmNotification = React.createClass({
    mixins: [OverlayMixin],
    render() {
        return (
            <Button onClick={this.handleToggle} bsStyle='primary'>Send to all users</Button>
        );
    },
    getInitialState() {
        return {
            isModalOpen: false
        };
    },

    handleToggle() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },
    handleModalToggle(state) {
        this.setState({
            isModalOpen: state
        });
    },

    renderOverlay() {
        if (!this.state.isModalOpen) {
            return <span/>;
        }

        return (
            <ConfirmNotificationModal onSave={this.props.onSave} onModalToggle={this.handleModalToggle}/>
        );
    }
});
