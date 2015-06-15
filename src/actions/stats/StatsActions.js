import {Dispatcher} from '../../core/Dispatcher.js';
var StatsConstants = require('../../constants/StatsConstants');

export var StatsActions = {
    changeStatsPeriod: function(data) {
        Dispatcher.handleViewAction({
            actionType: StatsConstants.STATS_PERIOD_CHANGE,
            data: data
        })
    }
};
