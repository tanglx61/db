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


exports.randomTag = randomTag;



exports.randomTags = randomTags;