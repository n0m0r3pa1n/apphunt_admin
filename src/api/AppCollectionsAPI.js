'use strict';

var $ = require("jquery")

import {APP_COLLECTIONS_URL} from '../config/config.js'
import {AppCollectionsActions} from '../actions/AppCollectionsActions.js'


export var AppCollectionsAPI = {
    createCollection(name, description, picture, userId) {
        $.ajax({
            url: APP_COLLECTIONS_URL,
            type: 'POST',
            data: {
                name: name,
                description: description,
                picture: picture,
                userId: userId
            },
            success: function (data) {
                AppCollectionsAPI.reloadCollections()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    getCollections: function (page, pageSize) {
        this.url = APP_COLLECTIONS_URL + "?pageSize=" + pageSize + "&page=" + page;
        $.get(this.url, function (data, status) {
            AppCollectionsActions.loadAppCollections({
                collections: formatCollections(data.collections),
                totalCount: data.totalCount
            });
        });
    },
    getCollection: function (collectionId) {
        this.url = APP_COLLECTIONS_URL + "/" + collectionId
        $.get(this.url, function (data, status) {
            AppCollectionsActions.loadAppCollection({collection: data})
        });
    },
    addAppsInCollection(collectionId, apps) {
        $.ajax({
            url: APP_COLLECTIONS_URL + "/" + collectionId,
            type: 'PUT',
            data: {
                apps: apps
            },
            success: function (data) {
                AppsAPI.reloadApps();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    reloadCollections: function() {
        $.get(this.url, function(data, status) {
            AppCollectionsActions.loadAppCollections({
                collections: formatCollections(data.collections),
                totalCount: data.totalCount
            });
        });
    }

};
function formatCollections(collections) {
    var result = []
    for(var i=0; i< collections.length; i++) {
        var collection = collections[i]
        collection.picture = collection.picture === undefined ? "" : collection.picture
        collection.createdByName = collection.createdBy.username !== undefined ? collection.createdBy.username : ""
        result.push(collection)
    }

    return result;
}