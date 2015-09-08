import {Dispatcher} from '../core/Dispatcher.js';
var NotificationConstants = require('../constants/NotificationConstants');

export var NotificationActions = {
    loadNotificationTypes: function(data) {
        Dispatcher.handleServerAction({
            actionType: NotificationConstants.LOAD_NOTIFICATION_TYPES,
            data: data
        })
    },
    notificationSent: function() {
        Dispatcher.handleServerAction({
            actionType: NotificationConstants.NOTIFICATION_SENT,
            data: {}
        })
    }
};