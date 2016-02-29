var MULTIPLIER = 10;

//try to keep the ratio (they're carefully calibrated), change the MULTIPLIER value instead for bigger dataset
var config = {
	users: 1 * MULTIPLIER,
	posts: 5 * MULTIPLIER,
	comments: 30 * MULTIPLIER,
	notifications: 2 * MULTIPLIER,
	votes: {
		posts: 4 * MULTIPLIER,
		comments: 6 * MULTIPLIER,
	},
	events: {
		browsing: 20 * MULTIPLIER,
		siteVisited: 20 * MULTIPLIER,
		postViewed: 15 * MULTIPLIER
	},
	chunkSize: 500, 
	dbpath: "postgres://localhost/comp421"
};




module.exports = config;