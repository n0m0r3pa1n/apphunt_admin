'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var Button = ReactBootstrap.Button

import {VotesAPI} from '../../../api/VotesAPI.js'

export default class AppsList extends React.Component {
    constructor(props) {
        super(props);
        this.apps = props.apps
    }

    render() {
        return (
            <div>
                AAAAAAAAA
            </div>
        );
    }
}