import {Dispatcher} from '../core/Dispatcher.js';
var AppCollectionsConstants = require('../constants/AppCollectionsConstants');

export var AppCollectionsActions = {
    loadAppCollections: function(data) {
        Dispatcher.handleServerAction({
            actionType: AppCollectionsConstants.LOAD_APP_COLLECTIONS,
            data: data
        })
    },
    loadAppCollection: function(data) {
        Dispatcher.handleServerAction({
            actionType: AppCollectionsConstants.LOAD_APP_COLLECTION,
            data: data
        })
    }
};