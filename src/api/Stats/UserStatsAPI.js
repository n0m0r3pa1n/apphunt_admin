'use strict';

import {BASE_URL, FLURRY_GENERAL_STATS_URL, FLURRY_EVENT_URL} from '../../config/config.js'
import {UserStatsActions} from '../../actions/stats/UserStatsActions.js'
import {DateUtils} from '../../utils/DateUtils.js'

var $ = require("jquery")
var _ = require('lodash');

export var UserStatsAPI = {
    updateStats: function (fromDate, toDate, version) {
        this.url = FLURRY_GENERAL_STATS_URL + "&startDate=" + fromDate + "&endDate=" + toDate
        if (version !== "all") {
            this.url += "&versionName=" + version
        }
        $.get(this.url, function (data, status) {
            UserStatsActions.loadUserStats(data);
        });
    },
    updateActiveUsers: function (fromDate, toDate, version) {
        this.url = FLURRY_GENERAL_STATS_URL + "&startDate=" + fromDate + "&endDate=" + toDate
        if (version !== "all") {
            this.url += "&versionName=" + version
        }

        let weeks = DateUtils.getWeeksInDate(fromDate, toDate);
        for (let i = 0; i < weeks.length; i++) {
            // TODO make multiple requests
        }
    },
    getEventDetails: function (fromDate, toDate, eventName, version) {
        this.url = FLURRY_EVENT_URL + "&startDate=" + fromDate + "&endDate=" + toDate + "&eventName=" + eventName
        if (version != undefined && version !== "all") {
            this.url += "&versionName=" + version
        }
        $.get(this.url, function (data, status) {
            let sortedApps = UserStatsAPI.get(data)
            if(sortedApps.length > 100) {
                sortedApps = sortedApps.slice(0, 100)
            }
            let packages = []
            for(let i=0; i < sortedApps.length; i++) {
                packages.push(sortedApps[i]['@name'])
            }

            $.ajax({
                url: BASE_URL + 'apps/packages',
                type: 'POST',
                data: {
                    packages: packages
                },
                success: function (apps) {
                    let result = []
                    for(let pack of packages) {
                        let app = _.find(apps, 'package', pack)
                        if(app != undefined) {
                            let event = _.find(sortedApps, '@name', pack)
                            result.push({app: app, count: event['@totalCount']})
                        }
                    }

                    UserStatsActions.loadEventDetails(result)
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("error: " + errorThrown)
                }
            });
            console.log(sortedApps)
        })
    },
    get: function (eventDetails) {
        var values = []
        if(Array.isArray(eventDetails.parameters.key)) {
            for(let key of eventDetails.parameters.key) {
                if(key["@name"] == "appPackage") {
                    values = key.value
                    break
                }
            }
        } else {
            values = eventDetails.parameters.key.value
        }

        let sortedValues = _.sortBy(values, function(value) {
            return Number(value["@totalCount"])
        })
        sortedValues.reverse()
        return sortedValues
    }
};
