'use strict';

import React from 'react';
import StatsSearchPicker from '../UserActions/SearchDate.js'
import {UserStatsAPI} from '../../../api/Stats/UserStatsAPI.js'
import {UserStatsStore} from '../../../stores/Stats/UserStatsStore'
var Collapse = require('rc-collapse');
var Panel = Collapse.Panel;

export default class UserStatsPage extends React.Component {
    constructor() {
        super();
        this.onSearch = this.onSearch.bind(this)
        this.onUserActions = this.onUserActions.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.state = {actions: {
            votes: {
                loginned: [],
                anonymous: [],
                fake: [],
                loginnedVotesCount: 0,
                anonymousVotesCount: 0,
                fakeVotesCount: 0
            }
        },
            comments: {
                loginnedCommentsCount: 0,
                anonymousCommentsCount: 0,
                loginned: [],
                anonymous: []
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
        console.log(actions)
        return (
            <div>
                <div>
                    <StatsSearchPicker ref="datePicker"/>
                    <button className="btn btn-default" onClick={this.onSearch}>Search</button>
                </div>
                <Collapse accordion={true}>
                    <Panel header="Votes">
                        {actions.votes.anonymous.length}
                    </Panel>
                    <Panel header="Comments">this is panel content2 or other</Panel>
                </Collapse>
            </div>
        );
    }
}