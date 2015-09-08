'use strict';
import {BASE_URL} from '../config/config.js'
import {NotificationActions} from '../actions/NotificationActions.js'
var $ = require("jquery")

export var NotificationsAPI = {
    getNotificationTypes: function () {
        var url = BASE_URL + "notifications/types"

        $.get(url, function (data, status) {
            NotificationActions.loadNotificationTypes(data);
        })
    },

    sendNotifications: function(users, title, message, image, type) {
        var url = BASE_URL + "notifications/actions/send"
        $.ajax({
            url: url,
            type: 'POST',
            data: {
                users: users,
                title: title,
                message: message,
                image: image,
                type: type
            },
            success: function (data) {
                NotificationActions.notificationSent()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    }
};

