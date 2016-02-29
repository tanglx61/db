/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');
var faker = require('faker');
var chalk = require('chalk');
var async = require('async');

var config = require('../config');

var bar = require('../progress');


var EventTypes = {
	POST_UPVOTED: 'postUpvoted',
	POST_DOWNVOTED: 'postDownvoted',
	COMMENT_UPVOTED: 'commentUpvoted',
	COMMENT_DOWNVOTED: 'commentDownvoted',
	POST_CREATED: 'postCreated',
	COMMENT_CREATED: 'commentCreated',
	POST_VIEWED: 'postViewed',
	SITE_VISITED: 'siteVisited',
	BROWSING: 'browsing'


};

exports.getCreateEventStatement = function(event) {
	var statement;

	switch(event.type) {
		case EventTypes.POST_UPVOTED:
		case EventTypes.POST_DOWNVOTED:
		case EventTypes.COMMENT_UPVOTED:
		case EventTypes.COMMENT_DOWNVOTED:
		case EventTypes.POST_CREATED:
		case EventTypes.COMMENT_CREATED:
		case EventTypes.SITE_VISITED:
			statement = sqlutil.formatInsertStatement('Event', ['type', 'uid'], [[event.type, event.uid]]);
			break;

		case EventTypes.POST_VIEWED:
		case EventTypes.BROWSING:
			statement = sqlutil.formatInsertStatement('Event', ['type', 'uid', 'data'], [[event.type, event.uid, event.data]]);
			break;
	}

	return statement;

};

exports.EventTypes = EventTypes;