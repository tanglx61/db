/*jslint node: true */
'use strict';

var Post = require('../models/Post');

var db = require('../db');
var sqlutil = require('../sqlutil');

exports.list = function(req, res) {
	var limitPerPage = 3;
	var sortBy = req.query.sortBy || 'pid';
	var page = req.query.page || 1;
	var offset = (page - 1) * limitPerPage ;

	var extraArgs = ' ORDER BY "' + sortBy + '" DESC '  + 'LIMIT ' + limitPerPage + ' OFFSET ' + offset ;
	var statement = sqlutil.formatSelectStatement('Post', '*', null, extraArgs);

	db.query(statement, function(err, result){
		if (err) {
			return res.sendStatus(500);
		}

		else res.send(result.rows);
	});

};


exports.create = function(req, res) {
	var title = req.body.title;
	var content = req.body.content;
	var uid = req.body.uid;

	if (!title || !content || !uid) {
		return res.sendStatus(400);
	}

	var opts = {
		db: db,
		post: {
			title: title,
			content: content,
			uid: uid
		}
	};

	Post.create(opts, function(err, result){
		if (err) return res.sendStatus(500);
		else res.send(result.rows);
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

