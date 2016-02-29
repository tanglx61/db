/*jslint node: true */
'use strict';

var sqlutil = require('../sqlutil');
var _ = require('lodash');
var faker = require('faker');
var chalk = require('chalk');
var async = require('async');

var config = require('../config');

var bar = require('../progress');


var EventTypes = {
	POST_VOTED: 'postVoted',
	COMMENT_VOTED: 'commentVoted',
	POST_CREATED: 'postCreated',
	COMMENT_CREATED: 'commentCreated',
	POST_VIEWED: 'postViewed',
	SITE_VISITED: 'siteVisited',
	BROWSING: 'browsing'


};

exports.getCreateEventStatement = function(opts) {

};


exports.EventTypes = EventTypes;