/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');


var DATA = require('../../data/categories.json');

exports.populate = function(db, callback) {
	console.time('populateCategories');

	var categoryDataArray = _.map(DATA, function(cat){
		return [cat.name, cat.description];
	});

	var statement = sqlutil.formatInsertStatement('Category', ['name', 'description'], categoryDataArray);

	console.log(statement);

	db.query(statement, function(err){
		console.timeEnd('populateCategories');
		if (callback) callback(err);
	});




};