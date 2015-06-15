'use strict';

import React from 'react';
var lodash = require('lodash')
import {Events} from '../../../constants/StatsEventsConstants.js';
import {UserStatsStore} from  '../../../stores/Stats/UserStatsStore.js'

export default class BasicUserStats extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                event: []
            }
        }
        this.onChange = this.onChange.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.findEvent = this.findEvent.bind(this)
    }

    componentDidMount() {
        UserStatsStore.addChangeListener(this.onChange)
    }

    componentWillUnmount() {
        UserStatsStore.removeChangeListener(this.onChange)
    }

    onChange() {
        this.setState({
            data: UserStatsStore.getBasicStatsData()
        })
    }

    render() {
        let events = this.state.data.event;
        let userLoggedInEvent = this.findEvent(events, Events.USER_LOGGED_IN);
        let userReplies = this.findEvent(events, Events.USER_LOGGED_IN);

        if(events.length == 0) {
            return (<div></div>);
        }

        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <td>
                            Users logged in
                        </td>
                        <td>
                            User comments
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            { userLoggedInEvent['@totalSessions'] }
                        </td>
                        <td>

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    findEvent(events, eventName) {
        for(let event of events) {
            if(event['@eventName'] === eventName) {
                return event;
            }
        }
    }
}