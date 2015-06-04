'use strict';
import {Dispatcher} from '../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
var UsersConstants = require('../constants/UsersConstants.js')
var _ = require('lodash');

var data = {}
function loadUserScores(newData) {
    data = newData;
}

export var UsersStore = _.extend({}, EventEmitter.prototype, {
    getUsersScore: function() {
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
        case UsersConstants.LOAD_USER_SCORES:
            loadUserScores(action.data);
            break;

        default:
            return true;
    }

    UsersStore.emitChange();

    return true;
})