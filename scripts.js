/*jslint node: true */
'use strict';

var fs = require('fs');


function readScript(path) {
	return fs.readFileSync(path).toString();
}

var CREATE_TABLES_SCRIPT = readScript('./scripts/create_tables.sql');
var DROP_TABLES_SCRIPT = readScript('./scripts/drop_tables.sql');


exports.createTables = CREATE_TABLES_SCRIPT;



exports.dropTables = DROP_TABLES_SCRIPT;


exports.dropTable = function(table) {
	return "DROP TABLE IF EXISTS " + table; 
};