'use strict';
import {Dispatcher} from '../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
var VersionConstants = require('../constants/VersionConstants')
var _ = require('lodash');

var data = {}
function loadVersion(newData) {
    data = newData;
}

export var VersionsStore = _.extend({}, EventEmitter.prototype, {
    getVersion: function() {
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
        case VersionConstants.LOAD_VERSION:
            loadVersion(action.data);
            break;
        default:
            return true;
    }
    VersionsStore.emitChange();
    return true;
})