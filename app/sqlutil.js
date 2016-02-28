if(!String.prototype.addSlashes){
   String.prototype.addSlashes = function() { 
	   return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
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
	var quote = singleQuotes ? '\'' : '\"';
	var s = "(";

	for (var i=0; i<params.length; i++){
		var p = params[i];

		if (p.addSlashes) {
			p = p.addSlashes();
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

	var statement = 'INSERT INTO \"' + tableName + '\"' + formatAttributes(attributes, false) + ' VALUES \n';

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



function isString(str) {
	return (typeof str === 'string' || str instanceof String);
}

