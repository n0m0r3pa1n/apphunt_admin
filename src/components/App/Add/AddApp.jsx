'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var OverlayMixin = ReactBootstrap.OverlayMixin
var Button = ReactBootstrap.Button
import {AddAppModal} from './AddAppModal.jsx'

export var AddApp = React.createClass({
    mixins: [OverlayMixin],
    render() {
        return (
            <Button onClick={this.handleToggle} bsStyle='primary'><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></Button>
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
            <AddAppModal onModalToggle={this.handleModalToggle}/>
        );
    }
});

