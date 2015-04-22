'use strict';
import {BASE_URL} from '../config/config.js'

var $ = require("jquery")
var baseURL = BASE_URL
var lastAppsDate = new Date();
var lastAppsPlatform = "";

import {DateUtils} from '../utils/DateUtils.js'
import {AppsActions} from '../actions/AppsActions.js'

export var AppsAPI = {
    url: "",
    getAppsForDate: function(date, platform, status, pageSize, page, callback) {
        lastAppsDate = date;
        lastAppsPlatform = platform;
        var dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        this.url = baseURL + "apps?date="+dateStr+"&platform="+platform+"&status="+status+"&pageSize="+pageSize+"&page=" + page;
        $.get(this.url, function(data, status) {
            if(callback !== undefined && callback !== null) {
                data.apps = getFormattedApps(data.apps)
                callback(data);
            }
        });
    },
    getAppsWithoutCallback: function(date, platform, status, pageSize, page) {
        var dateStr = "date=";
        if(date !== "") {
            lastAppsDate = date;
            lastAppsPlatform = platform;
            dateStr += date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + '&'
        } else {
            dateStr = ""
        }

        this.url = baseURL + "apps?"+dateStr+"platform="+platform+"&status="+status+"&pageSize="+pageSize+"&page=" + page;
        $.get(this.url, function(data, status) {
            AppsActions.loadApps({apps: getFormattedApps(data.apps), date: DateUtils.getDoubleDigitDate(data.date), totalCount: data.totalCount, platform: platform});
        });
    },
    getApps: function(platform) {
        this.getAppsForDate(new Date(), platform, "all", 40, 1, function(data) {
            AppsActions.loadApps({apps: data.apps, date: DateUtils.getDoubleDigitDate(data.date), totalCount: data.totalCount, platform: platform});
        })
    },
    getAppsForPreviousDay: function (page) {
        lastAppsDate.setDate(lastAppsDate.getDate() - 1)
        AppsAPI.getAppsForDate(lastAppsDate, lastAppsPlatform, "all", 40, 1, function(data) {
            AppsActions.receiveApps({apps: data.apps, date: DateUtils.getDoubleDigitDate(data.date), totalCount: data.totalCount, platform: lastAppsPlatform});
        });
    },
    reloadApps: function() {
        $.get(this.url, function(data, status) {
            AppsActions.loadApps({apps: getFormattedApps(data.apps), date: DateUtils.getDoubleDigitDate(data.date), totalCount: data.totalCount, platform: lastAppsPlatform});
        });
    }
};

function getFormattedApps(apps) {
    var newApps = []
    for(var i=0; i< apps.length; i++) {
        var app = apps[i]
        app.icon = app.icon === undefined ? "" : app.icon
        app.creatorType = app.createdBy.loginType != 'fake' ? 'real' : 'fake'
        app.createdByMail = app.createdBy.email.indexOf('@example.com') === -1 ? app.createdBy.email : ""
        app.createdBy = app.createdBy.username !== undefined ? app.createdBy.username : ""
        newApps.push(app)
    }

    return newApps;
}