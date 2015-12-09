var async = require('async');

var mongo = require('../mongo');
var conf = require('../conf');
var log = require('debug')(conf.name + ':channels');

module.exports = function (next) {
	mongo.db.collection('channels', function (err, channels) {
		if (err) return next(err);

		async.parallel([
			function (next) {
				log("Ensuring /channels/slug index");
				channels.ensureIndex('slug', { unique: true }, next);
			},
			function (next) {
				channels.updateOne(
					{
						slug: 'general'
					},
					{
						$set: {
							name: 'general',
							slug: 'general'
						},
						$setOnInsert: {
							messages: [],
							date: new Date()
						}
					},
					{
						upsert: true
					},
					next
				);
			}
		], next);
	});
};
