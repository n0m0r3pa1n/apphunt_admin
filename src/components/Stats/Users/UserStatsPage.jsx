'use strict';

import React from 'react';
import StatsDatePicker from '../StatsDatePicker.js'

export default class UserStatsPage extends React.Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <StatsDatePicker />
            </div>
        );
    }
}