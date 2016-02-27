
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


/**
 * format insert statements for inserting multiple values
 * @param  {String} tableName  table name, such as User, Event etc.
 * @param  {[String]} attributes attributes in string arrays
 * @param  {[[String]]} data       array of array of data. inner array represents a row of data to insert
 * @return {String}            formatted statement
 */
exports.formatInsertStatement = function(tableName, attributes, data) {
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

};



