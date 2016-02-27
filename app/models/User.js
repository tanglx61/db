/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');
var faker = require('faker');
var chalk = require('chalk');
var async = require('async');

var config = require('../config');
var DEFAULT_USER_COUNT = config.users;

/**
 * mass populate initial dataset.
 * This does not use business logic to populate the users, rather it uses bulk insertion
 */
exports.populate = function(opts, callback) {
	console.time('populateUsers');

	var c = opts.count;
	var count = (c && Number(c))  || DEFAULT_USER_COUNT;
	console.info('populating ' + count + ' Users...');

	var db = opts.db;
	var chunkSize = config.chunkSize;
	var useApplicationLogic = opts.useApplicationLogic;
	var username, password, email, photoUrl;
	var users = [];


	for (var i=0; i<count; i++) {
		username = faker.internet.userName();
		password = faker.internet.password(8,1);
		email = username + "@gmail.com";
		photoUrl = faker.image.avatar();

		users.push([username, password, email, photoUrl]);
	}

	if (useApplicationLogic) {
		async.eachSeries(users, function(user, next) {
			create({db: db, username:user[0], password:user[1], email:user[2], photoUrl:user[3]}, function(err){
				next(err);
			});
		}, function(err){
			console.timeEnd('populateUsers');
			callback(err);
		});


	} else {
		var statements = _.map( _.chunk(users, chunkSize), function(userChunk){
			return sqlutil.formatInsertStatement('User', ['username', 'password', 'email', 'photo_url'], userChunk);
		});

		db.multiQuery(statements, function(err, results){
			if (!err) console.log(chalk.green(c + ' users populated'));

			console.timeEnd('populateUsers');

			if (callback) return callback(err, results);
		});
	}
	
};




/**
 * create an account with application logic. This will automatically create an AnalyticsProfile for the user as well. See example query at scripts/create_usr.sql
 * 
 */
function create(opts, callback) {
	var db = opts.db;

	var username = opts.username;
	var password = opts.password;
	var email = opts.email;
	var photoUrl = opts.photoUrl;

	var statement = 
	"DO $$ \n" + 
	"DECLARE current_id integer;\n" + 
	"BEGIN\n" +
	sqlutil.formatInsertStatement('User', ['username', 'password', 'email', 'photo_url'], [[username, password, email, photoUrl]], false) + ' RETURNING uid INTO current_id;\n' +

	"INSERT INTO \"AnalyticsProfile\"(\"uid\", \"last_update\") VALUES (current_id, NOW());\n" +
	"END $$;";

	//console.log(statement);

	db.query(statement, function(err, result) {
		if (callback) return callback(err, result);
	});


}

exports.create = create;