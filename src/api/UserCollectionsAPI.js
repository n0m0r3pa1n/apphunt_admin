'use strict';

var $ = require("jquery")

import {USER_COLLECTIONS_URL} from '../config/config.js'
import {UserCollectionsActions} from '../actions/UserCollectionsActions.js'
import {AppsAPI} from './AppsAPI.js'


export var UserCollectionsAPI = {
    addToCollection: function (collectionId, userId, fromDate, toDate) {
        $.ajax({
            url: USER_COLLECTIONS_URL + "/" + collectionId,
            type: 'PUT',
            data: {
                users: [userId],
                fromDate: fromDate,
                toDate: toDate
            },
            success: function (data) {
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    createCollection: function (name, description, picture, userId) {
        $.ajax({
            url: USER_COLLECTIONS_URL,
            type: 'POST',
            data: {
                name: name,
                description: description,
                picture: picture,
                userId: userId
            },
            success: function (data) {
                console.log(data)
                UserCollectionsAPI.reloadCollections()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    getCollections: function (page, pageSize) {
        this.url = USER_COLLECTIONS_URL + "?pageSize=" + pageSize + "&page=" + page;
        $.get(this.url, function (data, status) {
            console.log(data)
            UserCollectionsActions.loadUserCollections({
                collections: formatCollections(data.collections),
                totalCount: data.totalCount
            });
        });
    },
    getCollection: function (collectionId) {
        var url = USER_COLLECTIONS_URL + "/" + collectionId;
        $.get(url, function (data, status) {
            UserCollectionsActions.loadUserCollection(formatCollection(data));
        });
    },
    getAvailableCollections: function(userId) {
        var url = USER_COLLECTIONS_URL + "/available?userId=" + userId
        $.get(url, function (data, status) {
            UserCollectionsActions.loadUserCollections(formatCollections(data));
        });
    },
    reloadCollections: function () {
        $.get(this.url, function (data, status) {
            UserCollectionsActions.loadUserCollections({
                collections: formatCollections(data.collections),
                totalCount: data.totalCount
            });
        });
    },
    removeUser: function (collectionId, userDetailsId) {
        $.ajax({
            url: USER_COLLECTIONS_URL + '/users?collectionId=' + collectionId + "&userDetailsId=" + userDetailsId,
            type: 'DELETE',
            success: function (data) {
                UserCollectionsAPI.getCollection(collectionId)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    removeCollection: function(collectionId) {
        $.ajax({
            url: USER_COLLECTIONS_URL + '?collectionId=' + collectionId,
            type: 'DELETE',
            success: function (data) {
                UserCollectionsAPI.reloadCollections()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    }
};
function formatCollections(collections) {
    var result = []
    for (var i = 0; i < collections.length; i++) {
        var collection = collections[i]
        result.push(formatCollection(collection))
    }

    return result;
}

function formatCollection(collection) {
    collection.picture = collection.picture === undefined ? "" : collection.picture
    collection.createdByName = collection.createdBy.username !== undefined ? collection.createdBy.username : ""
    return collection;
}