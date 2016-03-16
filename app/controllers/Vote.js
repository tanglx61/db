/*jslint node: true */
'use strict';

var Vote = require('../models/Vote');

var db = require('../db');
var sqlutil = require('../sqlutil');

// exports.list = function(req, res) {
// 	var limitPerPage = 100;
// 	var page = req.query.page || 1;
// 	var offset = (page - 1) * limitPerPage;

// 	var extraArgs = ' ORDER BY "uid" DESC '  + 'LIMIT ' + limitPerPage + ' OFFSET ' + offset ;
// 	var statement = sqlutil.formatSelectStatement('User', '*', null, extraArgs);

// 	db.query(statement, function(err, result){
// 		if (err) {
// 			return res.sendStatus(500);
// 		}

// 		else res.send(result.rows);
// 	});

// };


exports.create = function(req, res) {
	var pid = req.body.pid;
	var uid = req.body.uid;
	var vote = req.body.vote;
	var email = req.body.email;

	if (!pid || !vote || !uid) {
		return res.sendStatus(400);
	}

	var opts = {
		db: db,
		vote: {
			pid: pid,
			uid: uid,
			vote: vote,
		}
		
	};

	console.log(opts.vote);
	Vote.create(opts, function(err, result){
		if (err) return res.sendStatus(500);
		else res.send(result.rows);
	});

};


exports.get = function(req, res) {
	var pid = req.query.pid;
	var uid = req.query.uid;

	if (!pid || !uid) {
		return res.sendStatus(400);
	}

	var statement = 'SELECT "vote" FROM "PostVote" WHERE "pid"=' + pid + ' AND "uid"=' + uid + ';';

	db.query(statement, function(err, result){
		if (err) {
			res.sendStatus(500);
		} else if (result.rows.length === 0) {
			res.send({vote: 0});
		} else  {
			res.send(result.rows[0]);
		}
	});
};

// exports.getAnalytics = function(req, res) {
// 	var uid = req.query.uid;

// 	Analytics.analyzeUser(db, uid, function(err, result){
// 		if (err) return res.sendStatus(500);

// 		var statement = sqlutil.formatSelectStatement('AnalyticsProfile', '*', '"uid"=' + uid);
// 		db.query(statement, function(err, result){
// 			if (err) return res.sendStatus(500);
// 			else if (result.rows.length === 0) return res.sendStatus(404);
// 			else res.send(result.rows);
// 		});	
		
// 	});

// };

