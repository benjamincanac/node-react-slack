var mongo = require('../mongo');

function find(query, next) {
	mongo.db.collection('channels', function (err, channels) {
		if (err) return next(err);

		channels.find(
			query,
			{
			}
		).toArray(next);
	});
}

function findBySlug(slug, next) {
	mongo.db.collection('channels', function (err, channels) {
		if (err) return next(err);

		channels.findOne(
			{
				slug: slug
			},
			next
		);
	});
}

function create(channel, next) {
	mongo.db.collection('channels', function (err, channels) {
		if (err) return next(err);

		channels.insertOne(
			channel,
			next
		);
	});
}

function postMessage(slug, message, next) {
	mongo.db.collection('channels', function (err, channels) {
		if (err) return next(err);

		channels.updateOne(
			{
				slug: slug
			},
			{
				$push: {
					messages: message
				}
			},
			next
		);
	});
}

export default { find, findBySlug, create, postMessage };
