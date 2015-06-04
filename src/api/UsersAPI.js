'use strict';
import {BASE_URL, USERS_URL} from '../config/config.js'
var $ = require("jquery")
import {DateUtils} from '../utils/DateUtils.js'

var fakeUsersIds = []

$.get(BASE_URL + "users?loginType=fake", function(data, status) {
    var users = data
    users.forEach(function(user) {
        fakeUsersIds.push(user._id)
    })
});

export var UsersAPI = {
    getRandomUserId() {
        var index = Math.floor(Math.random() * fakeUsersIds.length)
        return fakeUsersIds[index]
    },
    getUsersScores: function(fromDate, toDate) {
        var url = USERS_URL + "/scores"

        if(fromDate != null) {
            var fromStr = DateUtils.formatDate(fromDate)
            url += "?fromDate=" + fromStr
        }

        if(toDate != null) {
            var toStr = DateUtils.formatDate(toDate)
            url += "&toDate=" + toStr
        }

        $.get(url, function(data, status) {
                console.log("AAAAAA")
                console.log(data)
        })
    }
};

