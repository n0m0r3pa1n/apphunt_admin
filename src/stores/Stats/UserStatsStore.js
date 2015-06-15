'use strict';
import {Dispatcher} from '../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
var StatsConstants = require('../../constants/StatsConstants')
var _ = require('lodash');

export var UserStatsStore = _.extend({}, EventEmitter.prototype, {
    getApps: function() {
        return data;
    },
    emitChange: function() {
        this.emit('change');
    },
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
})

Dispatcher.register(function(payload) {

    var text;
    switch(action.actionType) {
        case StatsConstants.STATS_PERIOD_CHANGE:
            //TODO Om nom
            break;

        default:
            return true;
    }

    UserStatsStore.emitChange();

    return true;
})