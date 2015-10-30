'use strict';

var $ = require("jquery")

import {BASE_URL} from '../config/config.js'
import {UsersAPI} from '../api/UsersAPI.js'
import {AppsAPI} from '../api/AppsAPI.js'

export var AppAPI = {
    addApp(platform, appPackage, appDescription) {
        var userId = UsersAPI.getRandomUserId()
        $.ajax({
            url: BASE_URL + 'apps',
            type: 'POST',
            data: {
                platform: platform,
                package: appPackage,
                description: appDescription,
                userId: userId
            },
            success: function (data) {
                AppsAPI.reloadApps();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    changeAppStatus(appPackage, status) {
        $.ajax({
            url: BASE_URL + 'apps/' + appPackage + '/status',
            type: 'POST',
            data: {
                status: status
            },
            success: function (data) {
                AppsAPI.reloadApps();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    updateApp(appPackage, createdAt, description, status) {
        $.ajax({
            url: BASE_URL + 'apps',
            type: 'PUT',
            data: {app: {
                package: appPackage,
                createdAt: createdAt,
                description: description,
                status: status
            }},
            success: function (data) {
                AppsAPI.reloadApps();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    deleteApp(appPackage) {
        $.ajax({
            url: BASE_URL + 'apps?package=' + appPackage,
            type: 'DELETE',
            success: function (data) {
                AppsAPI.reloadApps();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    }
};