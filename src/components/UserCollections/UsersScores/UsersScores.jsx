'use strict';

import React from 'react';
import {SearchForm} from './SearchForm.jsx'
import UsersScoreList from './UsersScoreList.jsx'

export default class UsersScores extends React.Component {

    constructor() {
        super();
        this.onDateRangeChanged = this.onDateRangeChanged.bind(this);
        this.state = {
            fromDate: new Date(),
            toDate: new Date()
        }
    }

    onDateRangeChanged(fromDate, toDate) {
        this.setState({
            fromDate: fromDate,
            toDate: toDate
        })
    }

    render() {
        return (
            <div>
                <SearchForm onDateRangeChanged={this.onDateRangeChanged}/>
                <UsersScoreList fromDate={this.state.fromDate} toDate={this.state.toDate}/>
            </div>
        )
    }

}