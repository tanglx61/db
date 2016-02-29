var MULTIPLIER = 10;

//try to keep the ratio, change the MULTIPLIER value instead for bigger dataset
var config = {
	users: 1 * MULTIPLIER,
	posts: 3 * MULTIPLIER,
	comments: 10 * MULTIPLIER,
	notifications: 2 * MULTIPLIER,
	votes: 2 * MULTIPLIER,
	chunkSize: 500, 
	dbpath: "postgres://localhost/comp421"
};




module.exports = config;