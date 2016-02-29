/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');
var faker = require('faker');
var chalk = require('chalk');
var async = require('async');
var config = require('../config');
var DEFAULT_POST_COUNT = config.posts;

var Category = require('./Category');
var Tag = require('./Tag');
var bar = require('../progress');
var Event = require('./Event');


exports.populate = function(opts, callback) {
	console.time('populatePosts');
	
	var c = opts.count;
	var count = (c && Number(c))  || DEFAULT_POST_COUNT;

	console.info('populating ' + count + ' Posts...');

	bar.init(count);

	var db = opts.db;
	var title, content;

	var posts = [];


	for (var i=0; i<count; i++) {

		var post = {
			title: faker.company.bs(),
			content: faker.image.imageUrl(),
			uid: faker.random.number({min:1, max:config.users}),
			categories: Category.randomCatIds(),
			tags: Tag.randomTags()
		};


		//console.log(post);


		posts.push(post);
	}

	async.eachSeries(posts, function(post, next){
		bar.tick();
		create({db: db, post: post}, next);
	}, function(err){
		console.timeEnd('populatePosts');
		if (callback) callback(err);
	});


};


/**
 * create a post with categories, tags
 */
function create(opts, callback) {
	var db = opts.db;
	var post = opts.post;

	// var statement = sqlutil.formatInsertStatement('Post', 
	// 	['title', 'content', 'uid'], 
	// 	[[post.title, post.content, post.uid]], false) + ' RETURNING pid';

	var statement = 
	"DO $$ \n" + 
	"DECLARE current_pid integer;\n" + 
	"BEGIN\n" +
	sqlutil.formatInsertStatement('Post', ['title', 'content', 'uid'], [[post.title, post.content, post.uid]], false) + ' RETURNING pid INTO current_pid;\n';

	_.each(post.categories, function(cat){
		statement += "INSERT INTO \"PostCategory\"(\"pid\", \"catId\") VALUES (current_pid, '" +  cat + "');\n";
	});


	statement += Event.getCreateEventStatement({
		uid: post.uid, 
		type: Event.EventTypes.POST_CREATED
	});

	if (post.tags) {
		statement += Tag.getTagPostStatement({variable: 'current_pid'}, post.tags);
	}

	statement += "\nEND $$;";

	//console.log(statement);

	return db.query(statement, callback);

	

}
