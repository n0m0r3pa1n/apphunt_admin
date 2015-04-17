'use strict';

var $ = require("jquery")

import {BASE_URL, APP_COMMENTS_URL} from '../config/config.js'
import {CommentsActions} from '../actions/CommentsActions.js'
import {UsersAPI} from './UsersAPI.js'

export var CommentsAPI = {
    self: this,
    reloadComments() {
        if (self.appId !== undefined) {
            CommentsAPI.getComments(self.appId)
        }
    }
    ,
    getComments(appId) {
        self.appId = appId;
        let url = APP_COMMENTS_URL + appId + '?page=1&pageSize=100'
        $.get(url, function(data, status) {
            CommentsActions.loadComments(data)
        });
    },
    addComment(comment, appId, parentId) {
        var userId = UsersAPI.getRandomUserId()
        var data = {
            appId: appId,
            userId: userId,
            text: comment
        }

        if(parentId !== "") {
            data.parentId = parentId
        }

        $.ajax({
            url: BASE_URL + "comments",
            type: 'POST',
            data: data,
            success: function (data) {
                CommentsAPI.reloadComments();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    }
};