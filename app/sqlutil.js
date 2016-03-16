if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}


function escapeString(val) {
  val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
    switch (s) {
      case "\0":
        return "\\0";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\b":
        return "\\b";
      case "\t":
        return "\\t";
      case "\x1a":
        return "\\Z";
      case "'":
        return "''";
      case '"':
        return '""';
      default:
        return "\\" + s;
    }
  });

  return val;
}



function formatAttributes(params, singleQuotes) {
	if (params === '*') return params;
	var quote = singleQuotes ? '\'' : '\"';
	var s = "(";

	for (var i=0; i<params.length; i++){
		var p = params[i];

		if (isString(p)) {
			p = escapeString(p);
		}

		if (p.variable) {
			s +=  p.variable ;
		} else {
			s += quote + p + quote;
		}
		

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
exports.formatInsertStatement = function(tableName, attributes, data, terminatingSemiColon) {
	if (terminatingSemiColon === undefined) terminatingSemiColon = true;

	var statement = 'INSERT INTO \"' + tableName + '\"' + formatAttributes(attributes, false);

	if (data) {
		statement += ' VALUES \n';
	} else {
		return statement;
	}

	for (var i=0; i<data.length; i++) {
		
		statement += formatAttributes(data[i], true);

		if (i < data.length-1) {
			statement += ',\n';
		} else {
			statement += terminatingSemiColon ? ';' : '';
		}
	}


	return statement;

};


exports.escapeString = escapeString;


exports.formatSelectStatement = function(tableName, attributes, conditions, extra) {
	var statement = 'SELECT ' + formatAttributes(attributes, false) + ' FROM "' + tableName + '"' ;

	if (conditions) {
		statement += ' WHERE ' + conditions;
	}

	if (extra) {
		statement += ' ' + extra;
	}

	statement += ';';

	return statement;
};


function isString(str) {
	return (typeof str === 'string' || str instanceof String);
}



