'use strict';

import React from 'react';
import StatsDatePicker from '../StatsSearchPicker.jsx'
import BasicUserStats from './BasicUserStats.jsx'

export default class UserStatsPage extends React.Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <StatsDatePicker />
                <BasicUserStats />
            </div>
        );
    }
}