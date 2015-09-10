import {Dispatcher} from '../core/Dispatcher.js';
var UsersConstants = require('../constants/UsersConstants');
export var UsersActions = {
    loadUsersWithScore: function(data) {
        Dispatcher.handleServerAction({
            actionType: UsersConstants.LOAD_USER_SCORES,
            data: data
        })
    },
    loadUsers: function(data) {
        Dispatcher.handleServerAction({
            actionType: UsersConstants.LOAD_USERS,
            data: data
        })
    }
};