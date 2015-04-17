'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var Button = ReactBootstrap.Button

import {CommentsStore} from '../../../stores/CommentsStore.js'
import {CommentsAPI} from '../../../api/CommentsAPI.js'
import {VotesAPI} from '../../../api/VotesAPI.js'

import {CommentReply} from './CommentReply/CommentReply.jsx'
import ChildComments from './ChildComments.js'

export default class AppComments extends React.Component {
    constructor(props) {
        super(props);
        this.appId = props.params.appId

        this.appName = props.query.appName
        this.appIcon = props.query.appIcon

        this._onChange = this._onChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this._voteForComment = this._voteForComment.bind(this);
        this._unvoteForComment = this._unvoteForComment.bind(this);

        CommentsAPI.getComments(this.appId)
    }

    componentDidMount() {
        CommentsStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        CommentsStore.removeChangeListener(this._onChange);
    }

    _onChange(data) {
        this.data = CommentsStore.getComments()
        this.setState({data: this.data})
    }

    _voteForComment(commentId) {
        VotesAPI.voteForComment(commentId)
    }

    _unvoteForComment(commentId) {
        VotesAPI.unvoteForComment(commentId)
    }

    render() {
        let comments = this.state === null ? [] : this.state.data.comments
        let iconStyle = {
            width: 96
        }
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>{this.appName}</h3>
                        <img src={this.appIcon} style={iconStyle} />
                    </div>
                    <div className="col-lg-12">
                        <h1 className="page-header">Comments</h1>
                        <CommentReply className="pull-right" appId={this.appId} />
                    </div>
                </div>
                <table className="table table-bordered table-hover panel-body" id="comments_table">
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Actions</th>
                        <th>Replies</th>
                    </tr>
                    </thead>
                    <tbody data-bind="foreach: comments()">
                    {
                        Object.keys(comments).map( (field, i) => {
                            let comment = comments[i]
                            let createdBy = comment.createdBy
                            return(
                                <tr>
                                    <td>{createdBy.name}</td>
                                    <td>{comment.text}</td>
                                    <td>
                                        <CommentReply appId={this.appId} parentId={comment._id} />
                                        <label>{comment.votesCount}</label>
                                        <Button  bsStyle="success" onClick={this._voteForComment.bind(this, comment._id)}>
                                            <span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                        </Button>
                                        <Button  bsStyle="danger" onClick={this._unvoteForComment.bind(this, comment._id)}>
                                            <span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span>
                                        </Button>
                                    </td>
                                    <td>
                                        <ChildComments comments={comment.children} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}