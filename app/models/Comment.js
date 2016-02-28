/*jslint node: true */
'use strict';

var async = require('async');
var chalk = require('chalk');
var faker = require('faker');
var _ = require('lodash');

var config = require('../config');
var DEFAULT_COMMENT_COUNT = config.comments;

var sqlutil = require('../sqlutil');

exports.populate = function(opts, callback) {
	console.time('populateComments');

	var c = opts.count;
	var count = (c && Number(c))  || DEFAULT_COMMENT_COUNT;

	console.info('populating ' + count + ' Comments...');

	var comments = [];


	for (var i=0; i<count; i++) {
		comments.push({
			content: faker.hacker.phrase(),
			uid: faker.random.number({min:1, max:config.users}),
			pid: faker.random.number({min:1, max:config.posts})
		});
	}


	async.eachSeries(comments, function(comment, next){
		create({db: opts.db, comment: comment}, next);
	}, function(err){
		console.timeEnd('populateComments');
		if (callback) callback(err);
	});
};	

function create(opts, callback) {
	var db = opts.db;
	var comment = opts.comment;

	var statement = getInsertCommentStatement(comment.content, comment.pid, comment.uid);
	//onsole.log(statement);
	db.query(statement, callback);
}



function getInsertCommentStatement(content, pid, uid) {
	return sqlutil.formatInsertStatement('Comment', ['content', 'pid', 'uid'], [[content, pid, uid]]);
}