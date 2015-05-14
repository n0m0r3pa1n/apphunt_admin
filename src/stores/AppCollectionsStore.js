'use strict';
import {Dispatcher} from '../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
import * as AppCollectionsConstants from '../constants/AppCollectionsConstants.js'
var _ = require('lodash');

var data = {}
function refreshData(newData) {
    data = newData;
}

export var AppCollectionsStore = _.extend({}, EventEmitter.prototype, {
    getAppCollections: function() {
        return data;
    },
    getAppCollection: function() {
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
        case AppCollectionsConstants.LOAD_APP_COLLECTIONS:
        case AppCollectionsConstants.LOAD_APP_COLLECTION:
            refreshData(action.data);
            break;

        default:
            return true;
    }

    AppCollectionsStore.emitChange();

    return true;
})