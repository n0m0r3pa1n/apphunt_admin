'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')

var Button = ReactBootstrap.Button
var Modal = ReactBootstrap.Modal

import {CommentsStore} from '../../../../stores/CommentsStore.js'
import {CommentsAPI} from '../../../../api/CommentsAPI.js'

export var CommentReplyModal = React.createClass({
    getInitialState() {
        return {
            isModalOpen: true,
            comment: ""
        };
    },
    handleToggle() {
        this.props.onModalToggle(!this.state.isModalOpen)
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    _updateComment() {
        CommentsAPI.addComment(this.comment, this.appId, this.parentId)
    },
    componentDidMount() {
        CommentsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        CommentsStore.removeChangeListener(this._onChange);
    },

    _onChange(data) {
        this.handleToggle()
    },
    handleCommentChange(event) {
        this.setState({comment: event.target.value});
    },

    render() {
        let isModalOpen = this.state.isModalOpen;
        this.comment = this.state.comment;
        this.parentId = this.props.parentId
        this.appId = this.props.appId;
        if (!isModalOpen) {
            return <span/>;
        }

        return (
            <Modal bsStyle='primary' title="Write reply" onRequestHide={this.handleToggle}>
                <form>
                <div className="modal-content">
                    <div className="modal-body">
                        <label for="comment">Comment</label>
                        <input id="comment" className="form-control" value={this.comment} type="text" onChange={this.handleCommentChange} />
                        <label style={{visibility: 'hidden'}} id="parentId" ></label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary save_app" data-dismiss="modal" onClick={this._updateComment}>Save</button>
                        <Button onClick={this.handleToggle}>Close</Button>
                    </div>
                </div>
                    </form>
            </Modal>
        );
    }
})