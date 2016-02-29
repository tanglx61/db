/*jslint node: true */
'use strict';

var async = require('async');
var chalk = require('chalk');
var faker = require('faker');
var _ = require('lodash');

var db = require('./app/db');
var DBManager = require('./app/dbman');


var config = require('./app/config');


var User = require('./app/models/User');
var Category = require('./app/models/Category');
var Post = require('./app/models/Post');
var Comment = require('./app/models/Comment');
var Notification = require('./app/models/Notification');
var Vote = require('./app/models/Vote');
var Event = require('./app/models/Event');

var option = process.argv[2];
var optionValue = process.argv[3];


function dropTables(callback) {
	console.log('dropping all tables');
	DBManager.dropTables(db, callback);
}

function reinitializeTables(callback) {
	DBManager.reinitializeTables(db, callback);
}


function bulkPopulatingUsers(callback) {
	User.populate({db: db, count: optionValue}, callback);
}

function populateUsers(callback) {
	User.populate({db: db, count: optionValue, useApplicationLogic: true}, callback);
}

function populateCategories(callback) {
	Category.populate(db, callback);
}

function populatePosts(callback) {
	Post.populate({db: db, count: optionValue}, callback);
}


function populateComments(callback) {
	Comment.populate({db: db, count: optionValue}, callback);
}

function populateNotifications(callback) {
	Notification.populate({db: db, count: optionValue}, callback);
}

function populatePostVotes(callback) {
	Vote.populate({db: db, count: optionValue, isPost: true}, callback);
}

function populateCommentVotes(callback) {
	Vote.populate({db: db, count: optionValue, isPost: false}, callback);
}

function populateBrowsingEvents(callback) {
	Event.populate({db: db, count: optionValue, type: Event.EventTypes.BROWSING}, callback);
}

function populateVisitEvents(callback) {
	Event.populate({db: db, count: optionValue, type: Event.EventTypes.SITE_VISITED}, callback);
}

function populatePostViewEvents(callback) {
	Event.populate({db: db, count: optionValue, type: Event.EventTypes.POST_VIEWED}, callback);
}



function initDatabase(callback) {
	console.log('running automated database population with ' + config.users +'Users, ' + config.posts + ' Posts');
	optionValue = null;
	async.series([
		reinitializeTables,
		populateUsers,
		populateCategories,
		populatePosts,
		populateComments,
		populateNotifications,
		populatePostVotes,
		populateCommentVotes,
		populateBrowsingEvents,
		populateVisitEvents,
		populatePostViewEvents
	], callback);
}


var dispatcherMap = {
	"-d": dropTables,
	"-r": reinitializeTables,
	"-i": initDatabase,
	'--users-bulk': bulkPopulatingUsers,
	'--users': populateUsers,

	'--categories': populateCategories,
	'--posts': populatePosts,
	'--comments': populateComments,
	'--notifications' : populateNotifications,
	'--postvotes': populatePostVotes,
	'--commentvotes': populateCommentVotes,
	'--events-browsing': populateBrowsingEvents,
	'--events-visits': populateVisitEvents,
	'--events-postviews': populatePostViewEvents
};

var f = dispatcherMap[option];

if (!f) {
	console.log(chalk.red('invalid option ' + option));
	process.exit(0);
}


db.ready(function(err) {
	if (err || !option) return db.close();

	console.time('totalRunTime');

	f(function(err){
		if (err) console.error(err);
		console.timeEnd('totalRunTime');
		db.close();
		process.exit(0);
	});

});





