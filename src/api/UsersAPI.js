'use strict';

var $ = require("jquery")

var baseURL = "https://apphunt.herokuapp.com/"
var fakeUsersIds = []

$.get(baseURL + "users?loginType=fake", function(data, status) {
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

