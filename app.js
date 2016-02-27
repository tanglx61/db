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
var Category = require('./app/models/Category');


var option = process.argv[2];
var optionValue = process.argv[3];


var dispatcherMap = {
	"-i": function(callback){
		DBManager.reinitializeTables(db, callback);
	},

	'-u_bulk': function(callback) {
		console.log('populating ' + optionValue + ' Users WITHOUT using application logic');
		User.populate({db: db, count: optionValue, chunkSize: CHUNK_SIZE}, callback);
	},

	'-u': function(callback) {
		console.log('populating ' + optionValue + ' Users using application logic');
		User.populate({db: db, count: optionValue, chunkSize: CHUNK_SIZE, useApplicationLogic: true}, callback);
	},
	'-cat': function(callback) {
		console.log('populating ' + optionValue + ' Categories using prepopulated data');
		Category.populate(db, callback);

	}
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





