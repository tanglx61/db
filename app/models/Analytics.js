/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');
var faker = require('faker');
var chalk = require('chalk');
var async = require('async');

var config = require('../config');

var bar = require('../progress');
var scripts = require('../scripts');

var bar = require('../progress');


exports.analyze = function(opts, callback) {
	

	if (opts.uid) {
		console.info('analyzing user ' + opts.uid);
		analyzeUser(opts.db, opts.uid, callback);
	} else {
		console.info('analyzing users 1 to ' + config.users + '...');
		console.time('analytics');

		bar.init(config.users);
		var uids = [];
		for (var i=1; i<=config.users; i++) {
			uids.push(i);
		}

		async.eachSeries(uids, function(uid, next){
			bar.tick();
			analyzeUser(opts.db, uid, next);
		}, function(err) {
			console.timeEnd('analytics');
			if (callback) callback(err);
		});
	}
};


function analyzeUser(db, uid, callback) {
	var statement = String.format(scripts.updateAnalytics, uid);
	db.query(statement, callback);
}