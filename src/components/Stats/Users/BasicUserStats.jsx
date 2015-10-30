'use strict';

import React from 'react';
var lodash = require('lodash')
import {Events} from '../../../constants/StatsEventsConstants.js';
import {UserStatsStore} from  '../../../stores/Stats/UserStatsStore.js'
import AppDetails from '../../App/AppDetails.jsx'

export default class BasicUserStats extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {}
        }
        this.onChange = this.onChange.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {
        UserStatsStore.addEventDetailsListener(this.onChange)
    }

    componentWillUnmount() {
        UserStatsStore.removeEventDetailsListener(this.onChange)
    }

    onChange() {
        this.setState({
            data: UserStatsStore.getEventDetails()
        })
    }

    render() {
        var iconStyle = {
            width: 96
        }

        let events = this.state.data;

        if (events.length == 0) {
            return (<div></div>);
        }

        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <td>Icon</td>
                        <td>
                            App Name
                        </td>
                        <td>
                            Category
                        </td>
                        <td>
                            Google Play Link
                        </td>
                        <td>
                            Uploaded by
                        </td>
                        <td>
                            Event Count
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.keys(events).map((field, i) => {
                            let event = events[i]
                            let app = event.app
                            return (
                                <tr>
                                    <td><img src={app.icon} style={iconStyle}/></td>
                                    <td>
                                        {app.name}
                                    </td>
                                    <td>
                                        {app.categories[0]}
                                    </td>
                                    <td>
                                        <a href={app.url} target="_blank">Link</a>
                                    </td>
                                    <td>
                                        {app.createdBy.loginType}
                                    </td>
                                    <td>
                                        {event.count}
                                    </td>
                                </tr>)
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}