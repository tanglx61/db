/*jslint node: true */
'use strict';

var async = require('async');
var chalk = require('chalk');
var faker = require('faker');
var _ = require('lodash');

var db = require('./db');
var scripts = require('./scripts');

var DEFAULT_USER_COUNT = 100000;
var CHUNK_SIZE = 500;


var option = process.argv[2];
var optionValue = process.argv[3];


var dispatcherMap = {
	"-i": reinitializeTables,
	'-u': populateUsers,
};


db.ready(function(err) {
	if (err || !option) return db.close();

	var f = dispatcherMap[option];
	if (f) {
		f(function(err){
			if (err) console.error(err);
			process.exit(0);
		});
	}

});



function reinitializeTables(callback) {
	console.time('reinitializingTables');
	async.series([dropTables, createTables], function(err){
		console.timeEnd('reinitializingTables');
		if (callback) callback(err);
	});
}


function dropTables(callback) {
	db.query(scripts.dropTables, callback);
}

function createTables(callback) {
	db.query(scripts.createTables, callback);
}


function populateUsers(callback) {
	console.time('populateUsers');
	var username, password, email, photoUrl;
	var users = [];

	var count = (optionValue && Number(optionValue))  || DEFAULT_USER_COUNT;

	for (var i=0; i<count; i++) {
		username = faker.internet.userName();
		password = faker.internet.password(8,1);
		email = username + "@gmail.com";
		photoUrl = faker.image.avatar();

		users.push([username, password, email, photoUrl]);
	}


	//var statement = formatInsertStatement('User', ['username', 'password', 'email', 'photoUrl'], users);
	

	var statements = _.map( _.chunk(users, CHUNK_SIZE), function(userChunk){
		return formatInsertStatement('User', ['username', 'password', 'email', 'photoUrl'], userChunk);
	});




	//console.log(statement);
	db.multiQuery(statements, function(err, results){
		console.timeEnd('populateUsers');

		if (callback) return callback(err, results);
	});

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

		if (i < data.length-1) {
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