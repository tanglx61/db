/*jslint node: true */
'use strict';

var async = require('async');
var chalk = require('chalk');
var faker = require('faker');
var _ = require('lodash');

var config = require('../config');
var sqlutil = require('../sqlutil');
var bar = require('../progress');


var DEFAULT_NOTIFICATION_COUNT = config.notifications;

var NotificationType = {
	POST_UPVOTE: 'postUpvote',
	POST_DOWNVOTE: 'postDownvote',
	COMMENT_UPVOTE: 'commentUpvote',
	COMMENT_DOWNVOTE: 'commentDownvote'
};


function createNotificationContent(type) {
	switch (type) {
		case NotificationType.POST_UPVOTE:
			return "upvoted your post";
		case NotificationType.POST_DOWNVOTE:
			return "downvoted your post";
		case NotificationType.COMMENT_UPVOTE:
			return "upvoted your comment";
		case NotificationType.COMMENT_DOWNVOTE:
			return "upvoted your comment";
		
	}
}


exports.populate = function(opts, callback) {
	console.time('populateNotifications');

	var c = opts.count;
	var count = (c && Number(c))  || DEFAULT_NOTIFICATION_COUNT;

	console.info('populating ' + count + ' Notifications...');
	bar.init(count);

	var notifs = [];


	for (var i=0; i<count; i++) {
		var type = faker.random.objectElement(NotificationType);
		notifs.push({
			from: faker.random.number({min:1, max:config.users}),
			uid: faker.random.number({min:1, max:config.users}),
			type: type,
			content: createNotificationContent(type),
			ts: String.format("(NOW() - '{0} seconds'::INTERVAL)", faker.random.number({min:0, max:864000}))
		});
	}


	async.eachSeries(notifs, function(notification, next){
		bar.tick();
		create({db: opts.db, notification: notification}, next);
	}, function(err){
		console.timeEnd('populateNotifications');
		if (callback) callback(err);
	});
};	


exports.populateRead = function(opts, callback) {
	
};

function readNotification(opts, callback) {
	var id, idValue;
	if (opts.uid) {
		id = 'uid';
		idValue = opts.uid;
	} else if (opts.nid) {
		id = 'nid';
		idValue = opts.nid;
	} else {
		callback('no nid or uid defined');
	}

	var statement = String.format("UPDATE \"Notification\" SET \"read_on\"=NOW() WHERE \"{0}\"='{1}'", id, idValue );


	opts.db.query(statement, callback);
}



function create(opts, callback) {
	var db = opts.db;
	var n = opts.notification;

	var statement = sqlutil.formatInsertStatement('Notification', ['uid', 'from', 'type', 'content', 'timestamp'], null);

	statement += String.format("\nSELECT '{0}', '{1}', '{2}', (\"username\" || ' {3}'), {4} FROM \"User\" WHERE \"uid\"='{1}';", n.uid, n.from, n.type, n.content, n.ts);
	//console.log(statement);
	db.query(statement, callback);
}