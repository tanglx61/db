/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');
var faker = require('faker');
var chalk = require('chalk');

var DEFAULT_USER_COUNT = 100000;

exports.populate = function(opts, callback) {
	console.time('populateUsers');
	var db = opts.db;
	var chunkSize = opts.chunkSize;
	var c = opts.count;
	var username, password, email, photoUrl;
	var users = [];

	var count = (c && Number(c))  || DEFAULT_USER_COUNT;

	for (var i=0; i<count; i++) {
		username = faker.internet.userName();
		password = faker.internet.password(8,1);
		email = username + "@gmail.com";
		photoUrl = faker.image.avatar();

		users.push([username, password, email, photoUrl]);
	}


	var statements = _.map( _.chunk(users, chunkSize), function(userChunk){
		return sqlutil.formatInsertStatement('User', ['username', 'password', 'email', 'photoUrl'], userChunk);
	});

	db.multiQuery(statements, function(err, results){
		if (!err) console.log(chalk.green(c + ' users populated'));

		console.timeEnd('populateUsers');

		if (callback) return callback(err, results);
	});
};