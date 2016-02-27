/*jslint node: true */
'use strict';

var async = require('async');
var chalk = require('chalk');
var faker = require('faker');
var _ = require('lodash');

var db = require('./db');
var scripts = require('./scripts');

var USER_COUNT = 5;

db.ready(function(err) {
	if (err) return;


	async.series([dropTables, createTables], function(err){
		if (err) return console.log(err);
		console.log(chalk.green('done!'));
	});


});





function dropTables(callback) {
	db.query(scripts.dropTables, callback);
}

function createTables(callback) {
	db.query(scripts.createTables, callback);
}

