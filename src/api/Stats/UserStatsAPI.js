'use strict';

import {FLURRY_GENERAL_STATS_URL} from '../../config/config.js'
import {UserStatsActions} from '../../actions/stats/UserStatsActions.js'

var $ = require("jquery")

export var UserStatsAPI = {
   updateStats: function(fromDate, toDate) {
       this.url = FLURRY_GENERAL_STATS_URL + "&startDate=2015-06-04&endDate=2015-06-15"
       $.get(this.url, function(data, status) {
           UserStatsActions.loadUserStats(data);
       });
   }
};
