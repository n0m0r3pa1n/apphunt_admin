'use strict';

import React from 'react';
import {AppAPI} from '../../api/AppAPI.js'

export default class AppDetails extends React.Component {
    constructor(props) {
        super(props);
        this.packageName = props.packageName;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                {this.packageName}
            </div>);
    }
}