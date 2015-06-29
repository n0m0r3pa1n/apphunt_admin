'use strict';

import {FLURRY_APP_INFO_URL} from '../../config/config.js'
import {StatsActions} from '../../actions/stats/StatsActions.js'

var $ = require("jquery")

export var StatsAPI = {
    getAppVersions: function() {
        $.get(FLURRY_APP_INFO_URL, function(data) {
            StatsActions.loadAppVersions(data);
        })
    }
};
