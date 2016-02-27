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


	// async.series([dropTables, createTables], function(err){
	// 	if (err) return console.log(err);
	// 	console.log(chalk.green('done!'));
	// });

	populateUsers(function(err, result){
		if (err) console.log(err);
		else console.log(chalk.green('done!'));
		process.exit();
	});

});





function dropTables(callback) {
	db.query(scripts.dropTables, callback);
}

function createTables(callback) {
	db.query(scripts.createTables, callback);
}


function populateUsers(callback) {
	var username, password, email, photoUrl;
	var users = [];

	for (var i=0; i<USER_COUNT; i++) {
		username = faker.internet.userName();
		password = faker.internet.password(8,1);
		email = username + "@gmail.com";
		photoUrl = faker.image.avatar();

		users.push([username, password, email, photoUrl]);
	}



	var statement = formatInsertStatement('User', ['username', 'password', 'email', 'photoUrl'], users);
	


	console.log(statement);
	db.query(statement, callback);

}


/**
 * format insert statements for inserting multiple values
 * @param  {String} tableName  table name, such as User, Event etc.
 * @param  {[String]} attributes attributes in string arrays
 * @param  {[[String]]} data       array of array of data. inner array represents a row of data to insert
 * @return {String}            formatted statement
 */
function formatInsertStatement(tableName, attributes, data) {
	var statement = 'INSERT INTO \"' + tableName + '\"' + formatAttributes(attributes, false) + ' VALUES \n';

	var username, password, email, photoUrl;

	for (var i=0; i<data.length; i++) {

		statement += formatAttributes(data[i], true);

		if (i < USER_COUNT-1) {
			statement += ',\n';
		} else {
			statement += ';';
		}
	}


	return statement;

}






function formatAttributes(params, singleQuotes) {
	var quote = singleQuotes ? '\'' : '\"';
	var s = "(";

	for (var i=0; i<params.length; i++){
		var p = params[i];
		s += quote + p + quote;

		if (i != params.length - 1) {
			s += ',';
		} else {
			s += ')';
		}
	}

	return s;
	
}