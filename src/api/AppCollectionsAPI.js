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
                console.log(data)
                AppCollectionsAPI.reloadCollections()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    getCollections: function (page, pageSize) {
        this.url = APP_COLLECTIONS_URL + "?pageSize=" + pageSize + "&page=" + page;
        console.log(this.url);
        $.get(this.url, function (data, status) {
            AppCollectionsActions.loadAppCollections({
                collections: formatCollections(data.collections),
                totalCount: data.totalCount
            });
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