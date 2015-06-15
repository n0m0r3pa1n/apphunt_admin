'use strict';

import React from 'react';
import StatsDatePicker from '../StatsSearchPicker.js'
import BasicUserStats from './BasicUserStats.js'

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