'use strict';

import React from 'react';
import {UserStatsStore} from  '../../../stores/Stats/UserStatsStore.js'

export default class BasicUserStats extends React.Component {
    constructor() {
        super();
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
        console.log('CHANGE')
    }

    render() {
        return (
            <div>
                AAA
            </div>
        );
    }
}