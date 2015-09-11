import {Dispatcher} from '../core/Dispatcher.js';
var VersionConstants = require('../constants/VersionConstants');

export var VersionActions = {
    loadVersion: function(data) {
        Dispatcher.handleServerAction({
            actionType: VersionConstants.LOAD_VERSION,
            data: data
        })
    }
};