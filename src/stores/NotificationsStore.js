'use strict';
import {Dispatcher} from '../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
var NotificationConstants = require('../constants/NotificationConstants')
var _ = require('lodash');

var data = {}
function loadTypes(newData) {
    data = newData;
}

export var NotificationsStore = _.extend({}, EventEmitter.prototype, {
    getTypes: function() {
        return data;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
})

Dispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.actionType) {
        case NotificationConstants.LOAD_NOTIFICATION_TYPES:
            loadTypes(action.data);
            break;
        case NotificationConstants.NOTIFICATION_SENT:
            break;
        default:
            return true;
    }

    NotificationsStore.emitChange();

    return true;
})