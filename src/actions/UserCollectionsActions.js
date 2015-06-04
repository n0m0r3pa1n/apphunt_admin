import {Dispatcher} from '../core/Dispatcher.js';
var UserCollectionsConstants = require('../constants/UserCollectionsConstants');

export var UserCollectionsActions = {
    loadUserCollections: function(data) {
        Dispatcher.handleServerAction({
            actionType: UserCollectionsConstants.LOAD_USER_COLLECTIONS,
            data: data
        })
    },
    loadUserCollection: function(data) {
        Dispatcher.handleServerAction({
            actionType: UserCollectionsConstants.LOAD_USER_COLLECTION,
            data: data
        })
    }
};