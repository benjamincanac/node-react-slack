require('babel-core/register');

var async = require('async');

var conf = require('./modules/conf');
var mongo = require('./modules/mongo');
var http = require('./modules/http');

function next(err) {
	if (err) throw err;
}

mongo.connect(function (err) {
	if (err) return next(err);

	require('./modules/io')(http.server);
	require('./modules/routes')(http.app);

	async.each(
		[
			'channels/channels'
		],
		function (module, next) {
			require('./modules/' + module + '-init')(next);
		},
		function (err) {
			if (err) return next(err);

			http.listen();
		});
});
