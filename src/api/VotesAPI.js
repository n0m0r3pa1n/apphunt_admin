'use strict';

import {BASE_URL} from '../config/config.js'

import {AppsAPI} from '../api/AppsAPI.js'
import {UsersAPI} from '../api/UsersAPI.js'
import {CommentsAPI} from '../api/CommentsAPI.js'

var $ = require("jquery")

export var VotesAPI = {
    vote: function(appId) {
        var url = BASE_URL + "apps/votes?userId=" + UsersAPI.getRandomUserId() + "&appId=" + appId;
        $.ajax({
            url: url,
            type: 'POST',
            success: function (data) {
                AppsAPI.reloadApps();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    unvote: function(appId) {
        var url = BASE_URL + "apps/votes?userId=" + UsersAPI.getRandomUserId() + "&appId=" + appId;
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function (data) {
                AppsAPI.reloadApps();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    voteForComment: function(commentId) {
        var url = BASE_URL + "comments/votes?userId=" + UsersAPI.getRandomUserId() + "&commentId=" + commentId;
        $.ajax({
            url: url,
            type: 'POST',
            success: function (data) {
                CommentsAPI.reloadComments();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    },
    unvoteForComment: function(commentId) {
        var url = BASE_URL + "comments/votes?userId=" + UsersAPI.getRandomUserId() + "&commentId=" + commentId;
        $.ajax({
            url: url,
            type: 'DELETE',
            success: function (data) {
                CommentsAPI.reloadComments();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error: " + errorThrown)
            }
        });
    }
};
