/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');
var faker = require('faker');
var chalk = require('chalk');
var async = require('async');

var config = require('../config');

var bar = require('../progress');

var Event = require('./Event');


exports.populate = function(opts, callback) {
	console.time('populateNotifications');

	var isPost = opts.isPost;

	var c = opts.count;
	var defaultVoteCount = isPost ? config.votes.posts : config.votes.comments;
	var count = (c && Number(c))  || defaultVoteCount;

	bar.init(count);

	if (isPost) {
		console.info('populating ' + count + ' PostVotes');
	} else {
		console.info('populating ' + count + ' CommentVotes');
	}
	

	var votes = [];


	for (var i=0; i<count; i++) {
		var vote = {
			uid: faker.random.number({min:1, max:config.users}),
			vote: faker.random.number({min:0, max:100}) < 90 ? 1 : -1
		};


		if (isPost) {
			vote.pid = faker.random.number({min:1, max:config.posts});
		} else {
			vote.cid = faker.random.number({min:1, max:config.comments});
		}

		votes.push(vote);
	}


	async.eachSeries(votes, function(vote, next){
		bar.tick();
		create({db: opts.db, vote: vote}, next);
	}, function(err){
		console.timeEnd('populateNotifications');
		if (callback) callback(err);
	});
};	




function create(opts, callback) {
	var db = opts.db;
	var vote = opts.vote;


	var statement;
	var ts = opts.ts || String.format("(NOW() - '{0} seconds'::INTERVAL)", faker.random.number({min:0, max:864000}));
	var event = {uid: vote.uid, ts:ts};

	if (vote.pid) {
		statement = sqlutil.formatInsertStatement('PostVote', ['uid', 'pid', 'vote', 'timestamp'], [[vote.uid, vote.pid, vote.vote, {variable: ts}]]);
		statement += String.format("UPDATE \"Post\" SET \"votes\" = \"votes\" + '{0}' WHERE \"pid\"='{1}';\n", vote.vote, vote.pid);
		event.type = vote.vote == 1 ? Event.EventTypes.POST_UPVOTED : Event.EventTypes.POST_DOWNVOTED;
	} else {
		statement = sqlutil.formatInsertStatement('CommentVote', ['uid', 'cid', 'vote'], [[vote.uid, vote.cid, vote.vote]]);
		statement += String.format("UPDATE \"Comment\" SET \"votes\" = \"votes\" + '{0}' WHERE \"cid\"='{1}';\n", vote.vote, vote.cid);
		event.type = vote.vote == 1 ? Event.EventTypes.COMMENT_UPVOTED : Event.EventTypes.COMMENT_DOWNVOTED;
	}

	statement += Event.getCreateEventStatement(event);

	//console.log(statement);
	db.query(statement, callback);
}

exports.create = create;
