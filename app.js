/*jslint node: true */
'use strict';

var async = require('async');
var chalk = require('chalk');
var faker = require('faker');
var _ = require('lodash');

var db = require('./app/db');
var DBManager = require('./app/dbman');

var CHUNK_SIZE = 500;


var User = require('./app/models/User');


var option = process.argv[2];
var optionValue = process.argv[3];


var dispatcherMap = {
	"-i": function(callback){
		DBManager.reinitializeTables(db, callback);
	},

	'-u': function(callback) {
		User.populate({db: db, count: optionValue, chunkSize: CHUNK_SIZE}, callback);
	},
};


db.ready(function(err) {
	if (err || !option) return db.close();

	console.time('totalRunTime');

	var f = dispatcherMap[option];
	if (f) {
		f(function(err){
			if (err) console.error(err);
			console.timeEnd('totalRunTime');
			process.exit(0);
		});
	}

});





