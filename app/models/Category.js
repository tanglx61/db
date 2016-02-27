/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');
var faker = require('faker');


var DATA = require('../../data/categories.json');


function randomCatId(){
	return faker.random.number({min:1, max:11});
}


function randomCatIds(n) {
	n = n || faker.random.number({min:1, max:3});

	var ids = [];

	for (var i=0; i<n; i++) {
		var id = randomCatId();
		if (ids.indexOf(id) == -1) {
			ids.push(randomCatId());
		} else {
			i--;
		}
	}

	return ids;
}


exports.populate = function(db, callback) {
	console.time('populateCategories');



	var categoryDataArray = _.map(DATA, function(cat){
		return [cat.name, cat.description];
	});

	console.info('populating ' + categoryDataArray.length + ' Categories...');

	var statement = sqlutil.formatInsertStatement('Category', ['name', 'description'], categoryDataArray);

	//console.log(statement);

	db.query(statement, function(err){
		console.timeEnd('populateCategories');
		if (callback) callback(err);
	});




};


exports.randomCatId = randomCatId;

exports.randomCatIds = randomCatIds;