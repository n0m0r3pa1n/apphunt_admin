'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var OverlayMixin = ReactBootstrap.OverlayMixin
var Button = ReactBootstrap.Button
import {CommentReplyModal} from './CommentReplyModal.jsx'

export var CommentReply = React.createClass({
    mixins: [OverlayMixin],
    parentId: "",
    render() {
        this.parentId= this.props.parentId
        this.appId= this.props.appId

        return (
            <Button bsStyle="primary" onClick={this.handleToggle}>Reply</Button>
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
            <CommentReplyModal appId={this.appId} parentId={this.parentId} onModalToggle={this.handleModalToggle}/>
        );
    }
});

