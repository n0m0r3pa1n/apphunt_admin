'use strict';
import {Dispatcher} from '../../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
import {UserStatsAPI} from '../../api/Stats/UserStatsAPI.js'
import {DateUtils} from '../../utils/DateUtils.js'
var StatsConstants = require('../../constants/StatsConstants')
var PayloadConstants = require('../../constants/PayloadConstants')
var _ = require('lodash');

var data = {}
function loadData(newData) {
    data = newData;
}
export var StatsStore = _.extend({}, EventEmitter.prototype, {
    getAppVersions: function() {
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
    if(payload.source == PayloadConstants.SERVER_ACTION) {
        handleServerAction(payload)
    }

    return true;
})

function handleServerAction(payload) {
    var action = payload.action;
    switch(action.actionType) {
        case StatsConstants.LOAD_APP_INFO:
            loadData(action.data.version)
            break;
        default:
            return true;
    }

    StatsStore.emitChange();
}