/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');
var faker = require('faker');


function randomTag(){
	var r = [
	faker.hacker.adjective(), 
	faker.hacker.noun(), 
	faker.hacker.verb(), 
	faker.hacker.ingverb(), 
	faker.company.bsBuzz()
	];
	return faker.random.arrayElement(r);
}


function randomTags(n) {
	n = n || faker.random.number({min:2, max:5});

	var tags = [];

	for (var i=0; i<n; i++) {
		tags.push(randomTag());
	}

	return tags;
}

/**
 * ensure tags exists in the database. if not, insert them
 */
function getEnsureTagsStatement(tags) {
	var statement = '';
	_.each(tags, function(tag){
		statement += "INSERT INTO \"Tag\"(\"name\") SELECT '" + tag + "' WHERE NOT EXISTS (SELECT 1 FROM \"Tag\" WHERE name='" + tag + "');\n"; 
	});

	return statement;
	//console.log(statement);
	
}	


function tagPost(db, pid, tags, callback) {
	var statement = getTagPostStatement(pid, tags);

	db.query(statement, callback);

}


function getTagPostStatement(pid, tags) {
	var statement = getEnsureTagsStatement(tags);
	tags = _.map(tags, function(tag){
		return [pid, tag];
	});
	statement += sqlutil.formatInsertStatement('PostTag', ['pid', 'tag'], tags);

	return statement;
}


exports.randomTag = randomTag;
exports.randomTags = randomTags;
exports.tagPost = tagPost;
exports.getTagPostStatement = getTagPostStatement;