'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var Button = ReactBootstrap.Button

import {CommentsAPI} from '../../../api/CommentsAPI.js'

export default class DeleteComment extends React.Component {
    constructor(props) {
        super(props);

        this._deleteComment = this._deleteComment.bind(this);
    }

    _deleteComment(commentId) {
        CommentsAPI.deleteComments(commentId)
    }

    render() {
        let commentId = this.props.commentId
        return (
            <div>
                <button className="btn btn-danger" style={{marginRight: 10}} onClick={this._deleteComment.bind(this, commentId)}>Delete</button>
            </div>
        );
    }
}