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


exports.analyze = function(opts, callback) {
	if (opts.uid) {
		var statement = String.format(scripts.updateAnalytics, opts.uid);

		opts.db.query(statement, callback);
	}
};


function analyzeUser(db, uid, callback) {

}