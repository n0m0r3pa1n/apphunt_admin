'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var Button = ReactBootstrap.Button

import {VotesAPI} from '../../../api/VotesAPI.js'

export default class ChildComments extends React.Component {
    constructor(props) {
        super(props);

        this._voteForComment = this._voteForComment.bind(this);
        this._unvoteForComment = this._unvoteForComment.bind(this);
    }

    _voteForComment(commentId) {
        VotesAPI.voteForComment(commentId)
    }

    _unvoteForComment(commentId) {
        VotesAPI.unvoteForComment(commentId)
    }

    render() {
        let comments = this.props.comments !== null ? this.props.comments : []
        return (
            <div>
                <table className="table table-bordered table-hover panel-body" >
                    <tbody data-bind="foreach: children">
                    {
                        Object.keys(comments).map((field, i) => {
                            let comment = comments[i]
                            return (
                            <tr>
                                <td>{comment.createdBy.name}</td>
                                <td>{comment.name}</td>
                                <td>{comment.text}</td>
                                <td>
                                    <label>{comment.votesCount}</label>
                                    <Button  bsStyle="success" onClick={this._voteForComment.bind(this, comment._id)}>
                                        <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                    </Button>
                                    <Button  bsStyle="danger" onClick={this._unvoteForComment.bind(this, comment._id)}>
                                        <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                                    </Button>
                                </td>
                            </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}