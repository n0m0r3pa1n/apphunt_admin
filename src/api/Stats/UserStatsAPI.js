'use strict';

import {FLURRY_GENERAL_STATS_URL} from '../../config/config.js'
import {UserStatsActions} from '../../actions/stats/UserStatsActions.js'
import {DateUtils} from '../../utils/DateUtils.js'
var $ = require("jquery")

export var UserStatsAPI = {
    updateStats: function(fromDate, toDate, version) {
        this.url = FLURRY_GENERAL_STATS_URL + "&startDate="+fromDate+"&endDate=" + toDate
        if(version !== "all") {
            this.url += "&versionName=" + version
        }
        $.get(this.url, function(data, status) {
            UserStatsActions.loadUserStats(data);
        });
    },
    updateActiveUsers: function(fromDate, toDate, version) {
        this.url = FLURRY_GENERAL_STATS_URL + "&startDate="+fromDate+"&endDate=" + toDate
        if(version !== "all") {
            this.url += "&versionName=" + version
        }

        let weeks = DateUtils.getWeeksInDate(fromDate, toDate);
        for(let i=0; i < weeks.length; i++) {
            // TODO make multiple requests
        }
    }
};
