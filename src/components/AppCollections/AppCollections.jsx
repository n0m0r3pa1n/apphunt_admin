'use strict';

import React from 'react';
var ReactBootstrap =  require('react-bootstrap')
var Button = ReactBootstrap.Button
import {AddAppCollection} from './Add/AddAppCollection.jsx'
import {AppsAPI} from '../../api/AppsAPI.js'

export default class AppCollections extends React.Component {
    constructor() {
        super();
        //AppsAPI.getApps("Android");
    }

    render() {

        return (
            <AddAppCollection/>
        );
    }
}