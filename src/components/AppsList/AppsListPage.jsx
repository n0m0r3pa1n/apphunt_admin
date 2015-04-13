'use strict';

import React from 'react';
import SearchForm from './SearchForm.jsx'
import AppsList from './AppsList.jsx'


export default class AppsListPage extends React.Component {
    constructor() {
        super();
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