'use strict';

import {AppsAPI} from '../api/AppsAPI.js'
var $ = require("jquery")

var baseURL = "https://apphunt.herokuapp.com/"
var fakeUsersIds = []

$.get(baseURL + "users?loginType=fake", function(data, status) {
    var users = data
    users.forEach(function(user) {
        fakeUsersIds.push(user._id)
    })
});

export var VotesAPI = {
    vote: function(appId) {
        var url = baseURL + "apps/votes?userId=" + getRandomUserId() + "&appId=" + appId;
        $.ajax({
            url: url,
            type: 'POST',
            success: function (data) {
                AppsAPI.reloadApps();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    unvote: function(appId) {
        var url = baseURL + "apps/votes?userId=" + getRandomUserId() + "&appId=" + appId;
        $.ajax({
            url: url,
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

function getRandomUserId() {
    var index = Math.floor(Math.random() * fakeUsersIds.length)
    return fakeUsersIds[index]
}