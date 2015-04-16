'use strict';
import {BASE_URL} from '../config/config.js'
var $ = require("jquery")

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
    }
};

