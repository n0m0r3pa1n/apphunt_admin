'use strict';
import {AppDispatcher} from '../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
import * as AppConstants from '../constants/AppsConstants.js'
console.log(AppConstants)
var _ = require('lodash');

var data = {}
function loadApps(newData) {
    data = newData;
}

var AppsStore = _.extend({}, EventEmitter.prototype, {
    getAppsData: function() {
        return data;
    },
    emitChange: function() {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
})


AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {
        case AppsConstants.RECEIVE_DATA:
            loadApps(action.data);
            break;

        default:
            return true;
    }

    AppsStore.emitChange();

    return true;
})

module.exports = AppsStore