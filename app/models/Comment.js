/*jslint node: true */
'use strict';

var async = require('async');
var chalk = require('chalk');
var faker = require('faker');
var _ = require('lodash');

var bar = require('../progress');

var config = require('../config');
var DEFAULT_COMMENT_COUNT = config.comments;

var sqlutil = require('../sqlutil');

var Event = require('./Event');

exports.populate = function(opts, callback) {
	console.time('populateComments');

	var c = opts.count;
	var count = (c && Number(c))  || DEFAULT_COMMENT_COUNT;

	console.info('populating ' + count + ' Comments...');
	bar.init(count);

	var comments = [];


	for (var i=0; i<count; i++) {
		comments.push({
			content: faker.hacker.phrase(),
			uid: faker.random.number({min:1, max:config.users}),
			pid: faker.random.number({min:1, max:config.posts}),
			ts: String.format("(NOW() - '{0} seconds'::INTERVAL)", faker.random.number({min:0, max:864000}))
		});
	}


	async.eachSeries(comments, function(comment, next){
		bar.tick();
		create({db: opts.db, comment: comment}, next);
	}, function(err){
		console.timeEnd('populateComments');
		if (callback) callback(err);
	});
};	

function create(opts, callback) {
	var db = opts.db;

	var statement = getInsertCommentStatement(opts.comment);
	//onsole.log(statement);
	db.query(statement, callback);
}



function getInsertCommentStatement(comment) {
	var statement = sqlutil.formatInsertStatement('Comment', 
		['content', 'pid', 'uid', 'timestamp'], 
		[[comment.content, comment.pid, comment.uid, {variable: comment.ts}]]);

	statement += Event.getCreateEventStatement({
		uid: comment.uid, 
		type: Event.EventTypes.COMMENT_CREATED,
		ts: comment.ts
	});
	
	return statement;	
}