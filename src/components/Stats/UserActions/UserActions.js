'use strict';

import React from 'react';
import StatsSearchPicker from '../UserActions/SearchDate.js'
import {UserStatsAPI} from '../../../api/Stats/UserStatsAPI.js'
import {UserStatsStore} from '../../../stores/Stats/UserStatsStore'
var Collapse = require('rc-collapse');
var Panel = Collapse.Panel;
var _ = require('lodash')

export default class UserStatsPage extends React.Component {
    constructor() {
        super();
        this.onSearch = this.onSearch.bind(this)
        this.onUserActions = this.onUserActions.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.state = {
            actions: {
                votes: {
                    loginned: [],
                    anonymous: [],
                    fake: [],
                    loginnedVotesCount: 0,
                    anonymousVotesCount: 0,
                    fakeVotesCount: 0
                },
                comments: {
                    loginnedCommentsCount: 0,
                    anonymousCommentsCount: 0,
                    loginned: [],
                    anonymous: []
                }
            }
        }
    }

    componentWillUnmount() {
        UserStatsStore.removeUserActionsListener(this.onUserActions)
    }

    componentDidMount() {
        UserStatsStore.addUserActionsListener(this.onUserActions)
    }

    onUserActions() {
        this.setState({
            actions: UserStatsStore.getUserActions()
        })
    }

    onSearch() {
        let searchDates = this.refs['datePicker'].getDates()
        UserStatsAPI.getUsersActions(searchDates.fromDate.toDate(), searchDates.toDate.toDate())
    }

    render() {
        let actions = this.state.actions == null ? {} : this.state.actions;

        let anonymousVotesCount = actions.votes.anonymousVotesCount;
        let anonymousVoteUsers = actions.votes.anonymous.length;
        let loginnedVotesCount = actions.votes.loginnedVotesCount;
        let loginnedVoteUsers = actions.votes.loginned.length;
        let fakeVotesCount = actions.votes.fakeVotesCount;
        let fakeVoteUsers = actions.votes.fake.length;


        let anonymousCommentsCount = actions.comments.anonymousCommentsCount;
        let loginnedCommentsCount = actions.comments.loginnedCommentsCount;
        let anonymousUsersCommented = actions.comments.anonymous.length
        let loginnedUsersCommented = actions.comments.loginned.length

        let sortedVotes = _.sortBy(actions.votes.loginned, function(n) {
            return n.votesCount;
        })
        sortedVotes.reverse()

        let sortedComments = _.sortBy(actions.comments.loginned, function(n) {
            return n.commentsCount;
        })
        sortedComments.reverse()
        console.log(sortedComments[0])

        return (
            <div>
                <div className="col-md-12">
                    <StatsSearchPicker ref="datePicker"/>
                    <button className="btn btn-default" onClick={this.onSearch}>Search</button>
                </div>
                <br />
                <br />
                <b><span style={{fontSize: 20}}>Votes</span></b>
                <table className="table">
                    <thead>
                    <th>Anonymous</th>
                    <th>Loginned</th>
                    <th>Fake</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            {anonymousVotesCount} votes
                        </td>
                        <td>
                            {loginnedVotesCount} votes
                        </td>
                        <td>
                            {fakeVotesCount} votes
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {anonymousVoteUsers} users
                        </td>
                        <td>
                            {loginnedVoteUsers} users
                        </td>
                        <td>
                            {fakeVoteUsers} users
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {(anonymousVotesCount / anonymousVoteUsers).toFixed(2)} votes per user.
                        </td>
                        <td>
                            {(loginnedVotesCount / loginnedVoteUsers).toFixed(2)} votes per user
                        </td>
                        <td>
                            {(fakeVotesCount / fakeVoteUsers).toFixed(2)} votes per user
                        </td>
                    </tr>
                    </tbody>
                </table>

                <b><span style={{fontSize: 20}}>Comments</span></b>
                <table className="table">
                    <thead>
                    <th>Anonymous</th>
                    <th>Loginned</th>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            { anonymousCommentsCount} comments
                        </td>
                        <td>
                            { loginnedCommentsCount} comments
                        </td>
                    </tr>
                    <tr>
                        <td>
                            { anonymousUsersCommented } users
                        </td>
                        <td>
                            { loginnedUsersCommented } users
                        </td>
                    </tr>
                    <tr>
                        <td>
                            { (anonymousCommentsCount/anonymousUsersCommented).toFixed(2) } comments per user
                        </td>
                        <td>
                            { (loginnedCommentsCount/loginnedUsersCommented).toFixed(2) } comments per user
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Collapse accordion={true}>
                    <Panel header="Votes Details">
                        {
                            Object.keys(sortedVotes).map((field, i) => {
                                let item = sortedVotes[i]
                                let voteDetails =
                                    <div>
                                        <span style={{fontSize: 16}}>{item.votesCount}</span> votes from <b>{item.user.name}</b> ({item.user.username})
                                    </div>
                                return ( <div style={{color: '#000'}}>{voteDetails}</div>)
                            })
                        }
                    </Panel>
                    <Panel header="Comments Details">
                        {
                            Object.keys(sortedComments).map((field, i) => {
                                let item = sortedComments[i]
                                let commentDetails =
                                    <div style={{fontSize: 20, color: '#000'}}>
                                        <b>{item.commentsCount}</b> comments from <b>{item.user.name}</b> ({item.user.username})
                                    </div>
                                let commentText = Object.keys(item.comments).map((field, i) => {
                                    let comment = item.comments[i]
                                    return (
                                        <div style={{color: '#000'}}>
                                            "<i>{comment.text}</i>" - <a href={comment.app.url} target="_blank">{comment.app.name}</a> ({comment.app.package})
                                        </div>
                                    )
                                })
                                return (
                                    <div>
                                        {commentDetails}
                                        {commentText}
                                        <br />
                                    </div>
                                )
                            })
                        }
                    </Panel>
                </Collapse>
            </div>
        );
    }
}