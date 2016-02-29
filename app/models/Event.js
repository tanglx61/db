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


//we only need to populate specific types of events. as some types are automatically populated through generation of other data such as CommentVotes, PostVotes etc.
exports.populate = function(opts, callback) {
	var type = opts.type;
	console.time('populateEvents_' + type);
	var c = opts.count;
	var count = (c && Number(c))  || config.events[type];

	console.info('populating ' + count + ' Events of type ' + type + ' ...');

	bar.init(count);

	var db = opts.db;
	var title, content;

	var events = [];


	for (var i=0; i<count; i++) {

		var event = {
			type: type,
			uid: faker.random.number({min:1, max:config.users})
		};

		//either a quick glimpse or professional procrastinator
		if (type === EventTypes.POST_VIEWED) {
			event.data = faker.random.number({min: 10, max: 300});	
		} else if (type ===  EventTypes.BROWSING) {
			event.data = faker.random.number({min: 1, max: 120});	
		}

		events.push(event);
	}

	async.eachSeries(events, function(event, next){
		bar.tick();
		create({db: db, event: event}, next);
	}, function(err){
		console.timeEnd('populateEvents_' + type);
		if (callback) callback(err);
	});


};


function create(opts, callback) {
	var statement = getCreateEventStatement(opts.event);
	//console.log(statement);
	opts.db.query(statement, callback);
}

function getCreateEventStatement(event) {
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

	return statement + '\n';

}



exports.getCreateEventStatement = getCreateEventStatement;

exports.EventTypes = EventTypes;