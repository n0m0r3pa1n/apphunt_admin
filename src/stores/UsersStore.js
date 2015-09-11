'use strict';
import {Dispatcher} from '../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
var UsersConstants = require('../constants/UsersConstants.js')
var _ = require('lodash');

var usersScore = {}
var users = {}
var loginTypes = {}
function loadScores(newData) {
    usersScore = newData;
}

function loadUsers(data) {
    users = data
}

function loadLoginTypes(data) {
    loginTypes = data
}

export var UsersStore = _.extend({}, EventEmitter.prototype, {
    getUsersScore: function() {
        return usersScore;
    },
    getUsers: function() {
        return users;
    },
    getLoginTypes: function() {
        return loginTypes;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    emitLoginTypesChange: function() {
        this.emit('loginTypes');
    },
    addLoginTypesListener: function(callback) {
        this.on('loginTypes', callback);
    },
    removeLoginTypesListener: function(callback) {
        this.removeListener('loginTypes', callback);
    }
})

Dispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.actionType) {
        case UsersConstants.LOAD_USER_SCORES:
            loadScores(action.data)
            UsersStore.emitChange();
            break;
        case UsersConstants.LOAD_USERS:
            loadUsers(action.data);
            UsersStore.emitChange();
            break;
        case UsersConstants.LOAD_LOGIN_TYPES:
            loadLoginTypes(action.data)
            UsersStore.emitLoginTypesChange();
            break;
        default:
            return true;
    }



    return true;
})