'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var OverlayMixin = ReactBootstrap.OverlayMixin
var Button = ReactBootstrap.Button
import {EditAppModal} from './EditAppModal.jsx'

export var EditApp = React.createClass({
    mixins: [OverlayMixin],
    render() {
        return (
            <Button className="btn btn-success" onClick={this.handleToggle} bsStyle='primary'>Edit</Button>
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
            <EditAppModal app={this.props.app} onModalToggle={this.handleModalToggle}/>
        );
    }
});

