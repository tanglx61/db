/*jslint node: true */
'use strict';

var User = require('../models/User');
var Analytics = require('../models/Analytics');

var db = require('../db');
var sqlutil = require('../sqlutil');

exports.list = function(req, res) {
	var limitPerPage = 100;
	var page = req.query.page || 1;
	var offset = (page - 1) * limitPerPage;

	var extraArgs = ' ORDER BY "uid" DESC '  + 'LIMIT ' + limitPerPage + ' OFFSET ' + offset ;
	var statement = sqlutil.formatSelectStatement('User', '*', null, extraArgs);

	db.query(statement, function(err, result){
		if (err) {
			return res.sendStatus(500);
		}

		else res.send(result.rows);
	});

};


exports.create = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;

	if (!username || !password || !email) {
		return res.sendStatus(400);
	}

	var opts = {
		db: db,
		username: username,
		password: password,
		email: email
	};

	User.create(opts, function(err, result){
		if (err) return res.sendStatus(500);
		else res.send(result.rows);
	});

};

exports.getAnalytics = function(req, res) {
	var uid = req.query.uid;

	Analytics.analyzeUser(db, uid, function(err, result){
		if (err) return res.sendStatus(500);

		var statement = sqlutil.formatSelectStatement('AnalyticsProfile', '*', '"uid"=' + uid);
		db.query(statement, function(err, result){
			if (err) return res.sendStatus(500);
			else if (result.rows.length === 0) return res.sendStatus(404);
			else res.send(result.rows);
		});	
		
	});

};

