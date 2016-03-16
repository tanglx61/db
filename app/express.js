/*jslint node: true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

var port = 8000;
var app = express();

var db;

	
var User = require('./controllers/User');
// var Category = require('./controllers/Category');
 var Post = require('./controllers/Post');
// var Comment = require('./controllers/Comment');
// var Notification = require('./controllers/Notification');
 var Vote = require('./controllers/Vote');
// var Event = require('./controllers/Event');
// var Analytics = require('./controllers/Analytics');


function initMiddleware() {
	app.use(bodyParser.urlencoded({
    	extended: true
  	}));
  	app.use(cors());
  	app.use(bodyParser.json());
  	app.use(methodOverride());
  	
}

function initRoutes(){
	app.route('/api/users')
		.get(User.list)
		.post(User.create);

	app.route('/api/analytics')
		.get(User.getAnalytics);

	app.route('/api/posts')
		.get(Post.list)
		.post(Post.create);

	app.route('/api/vote')
		.get(Vote.get)
		.post(Vote.create);
	
}





module.exports = function(database){
	db = database;
	initMiddleware();
	initRoutes();

	app.listen(port);
	console.log('Server started on localhost:' + port);
};