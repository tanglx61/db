/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');
var faker = require('faker');
var chalk = require('chalk');
var async = require('async');

var DEFAULT_POST_COUNT = require('../config').posts;

var Category = require('./Category');
var Tag = require('./Tag');



exports.populate = function(opts, callback) {
	console.time('populatePosts');
	
	var c = opts.count;
	var count = (c && Number(c))  || DEFAULT_POST_COUNT;

	console.info('populating ' + count + ' Posts...');

	var db = opts.db;
	var title, content;

	var posts = [];


	for (var i=0; i<count; i++) {

		var post = {
			title: faker.company.bs(),
			content: faker.image.imageUrl(),
			uid: faker.random.number({min:1, max:100}),
			categories: Category.randomCatIds(),
			tags: Tag.randomTags()
		};


		//console.log(post);


		posts.push(post);
	}

	async.eachSeries(posts, function(post, next){
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

	var statement = sqlutil.formatInsertStatement('Post', 
		['title', 'content', 'uid'], 
		[[post.title, post.content, post.uid]], false) + ' RETURNING pid';


	db.query(statement, function(err, result){
		var pid = result.rows[0].pid;
		
		if (post.tags) {
			Tag.tagPost(db, pid, post.tags, callback);
		}
	});

}

function tag(post, tags, callback) {

}