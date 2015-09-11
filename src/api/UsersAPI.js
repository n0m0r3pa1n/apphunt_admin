'use strict';
import {BASE_URL, USERS_URL} from '../config/config.js'
var $ = require("jquery")
import {DateUtils} from '../utils/DateUtils.js'
import {UsersActions} from '../actions/UsersActions.js'

var fakeUsersIds = []

$.get(BASE_URL + "users?loginType=fake", function (data, status) {
    var users = data.users
    users.forEach(function (user) {
        fakeUsersIds.push(user._id)
    })
});

export var UsersAPI = {
    getRandomUserId() {
        var index = Math.floor(Math.random() * fakeUsersIds.length)
        return fakeUsersIds[index]
    },
    getLoginTypes() {
        var url = USERS_URL + "/logintypes"
        $.get(url, function (data, status) {
            console.log(data)
            UsersActions.loadLoginTypes(data);
        })
    },
    getUsers(q, loginType, page, pageSize, reset) {
        var url = USERS_URL
        var query = {}
        if(q != null && q != '') {
            query.q = q

        }

        if(loginType != null) {
            query.loginType = loginType
        }

        if(page != null) {
            query.page = page
        }

        if(pageSize != null) {
            query.pageSize = pageSize
        }

        $.get(url + "?" + $.param(query), function (data, status) {
            console.log(data, status)
            UsersActions.loadUsers(data);
        })
    },
    getUsersScores: function (fromDate, toDate, loginType) {
        var url = USERS_URL + "/scores"

        if (fromDate != null) {
            var fromStr = DateUtils.formatDate(fromDate)
            url += "?fromDate=" + fromStr
        }

        if (toDate != null) {
            var toStr = DateUtils.formatDate(toDate)
            url += "&toDate=" + toStr
        }
        $.get(url, function (data, status) {
            var users = []
            data.forEach((user) => {
                if (loginType == "fake" && user.loginType == "fake") {
                    users.push(user)
                } else if(loginType == "real" && user.loginType !== "fake") {
                    users.push(user)
                } else if(loginType == "all"){
                    users.push(user)
                }
            })
            UsersActions.loadUsersWithScore(users);
        })
    }
};

