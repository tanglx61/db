/*jslint node: true */
'use strict';

var pg = require('pg');
var config = require('./config');
var dbpath = config.dbpath;
var async = require('async');

var client = new pg.Client(dbpath);


exports.ready = function(callback) {
	client.connect(function(err) {
		if(err) {
			console.error('could not connect to postgres', err);
		}

		return callback(err);
	});
};


exports.close = function(callback) {
	client.end();
};



exports.query = function(queryString, callback) {
	if (!queryString) {
		console.error('empty query string!');
		return;
	}

	client.query(queryString, function(err, result) {
		if (err){
			console.error('Error running query:', err);
		}

		return callback(err, result);
	});
};

exports.multiQuery = function(queries, callback) {
	var self = this;
	async.eachSeries(queries, function(query, next){
		self.query(query, next);
	}, callback);
};




