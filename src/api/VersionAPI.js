'use strict';
import {BASE_URL} from '../config/config.js'
import {VersionActions} from '../actions/VersionActions.js'
var $ = require("jquery")

export var VersionAPI = {
    getVersion: function () {
        var url = BASE_URL + "app/version"

        $.get(url, function (data, status) {
            VersionActions.loadVersion(data)
        })
    },

    updateVersion: function(versionCode) {
        var url = BASE_URL + "app/version"
        $.ajax({
            url: url,
            type: 'PUT',
            data: {
                versionCode: versionCode
            },
            success: function (data) {
                alert("VersionCode is now " + versionCode + " :)")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    }
};

