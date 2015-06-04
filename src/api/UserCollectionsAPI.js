'use strict';

var $ = require("jquery")

import {USER_COLLECTIONS_URL} from '../config/config.js'
import {UserCollectionsActions} from '../actions/UserCollectionsActions.js'
import {AppsAPI} from './AppsAPI.js'


export var UserCollectionsAPI = {
    createCollection: function(name, description, picture, userId) {
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
    //getCollection: function (collectionId) {
    //    this.url = APP_COLLECTIONS_URL + "/" + collectionId
    //    $.get(this.url, function (data, status) {
    //        AppCollectionsActions.loadAppCollection({collection: formatCollection(data)})
    //    });
    //},
    //addAppsInCollection: function(collectionId, apps) {
    //    $.ajax({
    //        url: APP_COLLECTIONS_URL + "/" + collectionId,
    //        type: 'PUT',
    //        data: {
    //            apps: apps
    //        },
    //        success: function (data) {
    //            AppCollectionsAPI.getCollection(collectionId)
    //        },
    //        error: function (jqXHR, textStatus, errorThrown) {
    //            console.log("error: " + errorThrown)
    //        }
    //    });
    //},
    reloadCollections: function () {
        $.get(this.url, function (data, status) {
            UserCollectionsActions.loadAppCollections({
                collections: formatCollections(data.collections),
                totalCount: data.totalCount
            });
        });
    },
    //removeApp: function(collectionId, appId) {
    //    $.ajax({
    //        url: APP_COLLECTIONS_URL + "/apps?collectionId=" + collectionId + "&appId=" + appId,
    //        type: 'DELETE',
    //        success: function (data) {
    //            AppCollectionsAPI.getCollection(collectionId)
    //        },
    //        error: function (jqXHR, textStatus, errorThrown) {
    //            console.log("error: " + errorThrown)
    //        }
    //    });
    //}
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