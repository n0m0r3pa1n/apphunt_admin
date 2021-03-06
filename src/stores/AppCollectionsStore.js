'use strict';
import {Dispatcher} from '../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
var AppCollectionsConstants = require('../constants/AppCollectionsConstants.js')
var _ = require('lodash');

var collectionsData = {}
var collectionData = {}
function refreshCollections(newData) {
    collectionsData = newData;
}
function refreshCollection(newData) {
    collectionData = newData;
}
export var AppCollectionsStore = _.extend({}, EventEmitter.prototype, {
    getAppCollections: function() {
        return collectionsData;
    },
    getAppCollection: function() {
        return collectionData;
    },
    emitLoadAppCollection: function() {
        this.emit('loadAppCollection');
    },
    emitLoadAppCollections: function() {
        this.emit('loadAppCollections');
    },
    addLoadAppCollectionsListener: function(callback) {
        this.on('loadAppCollections', callback);
    },
    removeLoadAppCollectionsListener: function(callback) {
        this.removeListener('loadAppCollections', callback);
    },
    addLoadAppCollectionListener: function(callback) {
        this.on('loadAppCollection', callback);
    },
    removeLoadAppCollectionListener: function(callback) {
        this.removeListener('loadAppCollection', callback);
    }
})

Dispatcher.register(function(payload) {
    var action = payload.action;
    var text;
    switch(action.actionType) {
        case AppCollectionsConstants.LOAD_APP_COLLECTIONS:
            refreshCollections(action.data);
            AppCollectionsStore.emitLoadAppCollections()
            break;
        case AppCollectionsConstants.LOAD_APP_COLLECTION:
            refreshCollection(action.data);
            AppCollectionsStore.emitLoadAppCollection()
            break;

        default:
            return true;
    }


    return true;
})