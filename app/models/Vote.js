/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');
var faker = require('faker');
var chalk = require('chalk');
var async = require('async');

var config = require('../config');

var bar = require('../progress');

var DEFAULT_VOTE_COUNT = config.votes;


exports.populate = function(opts, callback) {
	console.time('populateNotifications');

	var isPost = opts.isPost;

	var c = opts.count;
	var count = (c && Number(c))  || DEFAULT_VOTE_COUNT;

	bar.init(count);

	if (isPost) {
		console.info('populating ' + count + ' PostVotes');
	} else {
		console.info('populating ' + count + ' CommentVotes');
	}
	

	var votes = [];


	for (var i=0; i<count; i++) {
		var vote = {
			uid: faker.random.number({min:1, max:config.users})
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

	if (vote.pid) {
		statement = sqlutil.formatInsertStatement('PostVote', ['uid', 'pid'], [[vote.uid, vote.pid]]);
	} else {
		statement = sqlutil.formatInsertStatement('CommentVote', ['uid', 'cid'], [[vote.uid, vote.cid]]);
	}

	//console.log(statement);
	db.query(statement, callback);
}
