'use strict';
import {Dispatcher} from '../../core/Dispatcher.js'
import {EventEmitter} from 'eventemitter3'
import {UserStatsAPI} from '../../api/Stats/UserStatsAPI.js'
import {DateUtils} from '../../utils/DateUtils.js'
var StatsConstants = require('../../constants/StatsConstants')
var PayloadConstants = require('../../constants/PayloadConstants')
var _ = require('lodash');

var basicData = {}
var loadBasicData = function (data) {
    basicData = data;
}

var eventDetails = {}
var loadEventDetails = function (data) {
    eventDetails = data;
}

export var UserStatsStore = _.extend({}, EventEmitter.prototype, {
    getApps: function () {
        return data;
    },
    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    },
    emitEventDetails: function () {
        this.emit('eventDetails');
    },
    addEventDetailsListener: function (callback) {
        this.on('eventDetails', callback);
    },
    removeEventDetailsListener: function (callback) {
        this.removeListener('eventDetails', callback);
    },
    getBasicStatsData: function () {
        return basicData;
    },
    getEventDetails: function () {
        return eventDetails
    }

})

Dispatcher.register(function (payload) {
    if (payload.source == PayloadConstants.VIEW_ACTION) {
        handleViewAction(payload)
    } else if (payload.source == PayloadConstants.SERVER_ACTION) {
        handleServerAction(payload)
    }

    return true;
})

function handleViewAction(payload) {
    var action = payload.action;
    switch (action.actionType) {
        case StatsConstants.STATS_PERIOD_CHANGE:
            UserStatsAPI.updateStats(DateUtils.formatDate(action.data.fromDate.toDate()), DateUtils.formatDate(action.data.toDate.toDate()),
                action.data.version);

            UserStatsAPI.updateActiveUsers(DateUtils.formatDate(action.data.fromDate.toDate()), DateUtils.formatDate(action.data.toDate.toDate()),
                action.data.version);
            break;
        default:
            return true;
    }
}

function handleServerAction(payload) {
    var action = payload.action;
    switch (action.actionType) {
        case StatsConstants.LOAD_USER_STATS:
            loadBasicData(action.data)
            UserStatsStore.emitChange();
            break;
        case StatsConstants.LOAD_EVENT_DETAILS:
            loadEventDetails(action.data)
            UserStatsStore.emitEventDetails();
            break;
        default:
            return true;
    }


}