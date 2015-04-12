import {Dispatcher} from '../core/Dispatcher.js';
var AppsConstants = require('../constants/AppsConstants');

export var AppsActions = {
    loadApps: function(data) {
        Dispatcher.handleServerAction({
            actionType: AppsConstants.RECEIVE_DATA,
            data: data
        })
    }
};