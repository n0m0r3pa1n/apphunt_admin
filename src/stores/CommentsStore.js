'use strict';
import {Dispatcher} from '../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
var CommentsConstants = require('../constants/CommentsConstants.js')
var _ = require('lodash');

var data = {}
function loadComments(newData) {
    data = newData;
}

export var CommentsStore = _.extend({}, EventEmitter.prototype, {
    getComments: function() {
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
        case CommentsConstants.LOAD_COMMENTS:
            loadComments(action.data);
            break;

        default:
            return true;
    }

    CommentsStore.emitChange();

    return true;
})