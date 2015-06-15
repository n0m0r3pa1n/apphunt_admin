import {Dispatcher} from '../../core/Dispatcher.js';
var StatsConstants = require('../../constants/StatsConstants');

export var UserStatsActions = {
    loadUserStats: function(data) {
        Dispatcher.handleServerAction({
            actionType: StatsConstants.LOAD_USER_STATS,
            data: data
        })
    }
};

