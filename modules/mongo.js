var MongoDb = require('mongodb');
var MongoClient = MongoDb.MongoClient;

var conf = require('./conf');
var log = require('debug')(conf.name + ':mongo');

module.exports.connect = function (next) {
	delete module.exports.connect;

	MongoClient.connect(conf.mongo.url, function (err, db) {
		if (err) return next(err);

		log(conf.mongo.url + ' connected');

		module.exports.db = db;

		return next();
	});
};

module.exports.oid = function (id) {
	return new MongoDb.ObjectID(id);
};
