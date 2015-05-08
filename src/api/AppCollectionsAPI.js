'use strict';

var $ = require("jquery")

import {APP_COLLECTIONS_URL} from '../config/config.js'


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
                //AppsAPI.reloadApps();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    }
};