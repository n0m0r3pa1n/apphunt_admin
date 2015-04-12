'use strict';
import {Dispatcher} from '../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
import * as AppConstants from '../constants/AppsConstants.js'
var _ = require('lodash');

var data = {}
function loadApps(newData) {
    data = newData;
}

export var AppsStore = _.extend({}, EventEmitter.prototype, {
    getApps: function() {
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
    var text;
    switch(action.action) {
        case AppConstants.LOAD_APPS:
            loadApps(action.data);
            break;

        default:
            return true;
    }

    AppsStore.emitChange();

    return true;
})