'use strict';

import React from 'react';
import {SearchForm} from './SearchForm.jsx'
import UsersScoreList from './UsersScoreList.jsx'

export default class UsersScores extends React.Component {

    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <SearchForm />
                <UsersScoreList />
            </div>
        )
    }

}