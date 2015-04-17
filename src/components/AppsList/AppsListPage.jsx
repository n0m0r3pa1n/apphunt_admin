'use strict';

import React from 'react';
import SearchForm from './SearchForm.jsx'
import AppsList from './AppsList.jsx'

import {AppsAPI} from '../../api/AppsAPI.js'

export default class AppsListPage extends React.Component {
    constructor() {
        super();
        AppsAPI.getApps("Android");
    }

    render() {

        return (
            <div>
                <SearchForm />
                <AppsList />
            </div>
        );
    }
}