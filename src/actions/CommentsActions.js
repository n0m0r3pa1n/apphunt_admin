import {Dispatcher} from '../core/Dispatcher.js';
var CommentsConstants = require('../constants/CommentsConstants');

export var CommentsActions = {
    loadComments: function(data) {
        Dispatcher.handleServerAction({
            actionType: CommentsConstants.LOAD_COMMENTS,
            data: data
        })
    }
};