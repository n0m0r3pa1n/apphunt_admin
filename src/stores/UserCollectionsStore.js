'use strict';
import {Dispatcher} from '../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
var UserCollectionsConstants = require('../constants/UserCollectionsConstants.js')
var _ = require('lodash');

var collectionsData = {}
var collectionData = {}
function refreshCollections(newData) {
    collectionsData = newData;
}
function refreshCollection(newData) {
    collectionData = newData;
}
export var UserCollectionsStore = _.extend({}, EventEmitter.prototype, {
    getUserCollections: function() {
        return collectionsData;
    },
    getUserCollection: function() {
        return collectionData;
    },
    emitLoadUserCollection: function() {
        this.emit('loadUserCollection');
    },
    emitLoadUserCollections: function() {
        this.emit('loadUserCollections');
    },
    addLoadUserCollectionsListener: function(callback) {
        this.on('loadUserCollections', callback);
    },
    removeLoadUserCollectionsListener: function(callback) {
        this.removeListener('loadUserCollections', callback);
    },
    addLoadUserCollectionListener: function(callback) {
        this.on('loadUserCollection', callback);
    },
    removeLoadUserCollectionListener: function(callback) {
        this.removeListener('loadUserCollection', callback);
    }
})

Dispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.actionType) {
        case UserCollectionsConstants.LOAD_USER_COLLECTIONS:
            refreshCollections(action.data);
            UserCollectionsStore.emitLoadUserCollections()
            break;
        case UserCollectionsConstants.LOAD_USER_COLLECTION:
            refreshCollection(action.data);
            UserCollectionsStore.emitLoadUserCollection()
            break;

        default:
            return true;
    }


    return true;
})