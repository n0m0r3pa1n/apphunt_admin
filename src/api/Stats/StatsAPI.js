'use strict';

import {FLURRY_APP_INFO_URL} from '../../config/config.js'
import {StatsActions} from '../../actions/stats/StatsActions.js'

var $ = require("jquery")

export var StatsAPI = {
    getAppVersions: function() {
        $.ajax({
            url: FLURRY_APP_INFO_URL,

            // The name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            // Tell jQuery we're expecting JSONP
            dataType: "jsonp",


            // Work with the response
            success: function( response ) {
                StatsActions.loadAppVersions(data);
            },
            error: function(response) {
            }
        });
        //$.get(FLURRY_APP_INFO_URL, function(data) {
        //
        //})
    }
};
