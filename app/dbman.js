/*jslint node: true */
'use strict';

/**
 * DB Manager, has methods to create and drop tables 
 */

var async = require('async');
var scripts = require('./scripts');


function dropTables(db, callback) {
	db.query(scripts.dropTables, callback);
}

function createTables(db, callback) {
	db.query(scripts.createTables, callback);
}



exports.dropTables = dropTables;

exports.createTables = createTables;


exports.reinitializeTables = function(db, callback){
	console.time('reinitializingTables');
	async.series([
		function(cb){
			dropTables(db, cb);
		}, 
		function(cb){
			createTables(db, cb);
		}
		], function(err){
		console.timeEnd('reinitializingTables');
		if (callback) callback(err);
	});
};
