'use strict';

import {FLURRY_GENERAL_STATS_URL} from '../../config/config.js'
import {UserStatsActions} from '../../actions/stats/UserStatsActions.js'

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
   }
};
