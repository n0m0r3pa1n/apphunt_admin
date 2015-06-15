'use strict';

import React from 'react';
var lodash = require('lodash')
import {USER_LOGGED_IN} from '../../../constants/StatsEventsConstants.js';
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
        let userLoggedInEvent = {};
        for(let event of events) {
            if(event['@eventName'] === USER_LOGGED_IN) {
                userLoggedInEvent = event
                break;
            }
        }
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
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            { userLoggedInEvent['@totalSessions'] }
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}