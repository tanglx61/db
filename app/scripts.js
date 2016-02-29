/*jslint node: true */
'use strict';

var fs = require('fs');
var path = require('path');

function readScript(filename) {

	return fs.readFileSync(path.join(__dirname, filename)).toString();
}

var CREATE_TABLES_SCRIPT = readScript('../scripts/create_tables.sql');
var DROP_TABLES_SCRIPT = readScript('../scripts/drop_tables.sql');
var UPDATE_ANALYTICS_SCRIPT = readScript('../scripts/update_analytics.sql');


exports.createTables = CREATE_TABLES_SCRIPT;
exports.dropTables = DROP_TABLES_SCRIPT;
exports.updateAnalytics = UPDATE_ANALYTICS_SCRIPT;


exports.dropTable = function(table) {
	return "DROP TABLE IF EXISTS " + table; 
};