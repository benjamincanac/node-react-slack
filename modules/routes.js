var jade = require('jade');

var templatePath = require.resolve('../views/react.jade');
var templateFn = jade.compileFile(templatePath, null);

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

var Iso = require('iso');

import alt from './alt';

var conf = require('./conf');
var log = require('debug')(conf.name + ':routes');

import routes from './components/routes.react';

import NotFoundError from './utils/not-found-error';

module.exports = function (app) {
	app.get('/api', function (req, res) {
		res.status(200).send(conf.name);
	});

	app.get('/api/ping', function (req, res) {
		res.status(200).send('pong');
	});

	[
		'channels/channels'
	].forEach(function (module) {
		app.use('/api', require('./' + module + '-api-endpoints'));
	});

	app.use('/api', function(req, res, next) {
		var err = new NotFoundError('not-found');
		next(err);
	});

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use('/api', function(err, req, res, next) {
			log(err);
			res.status(err.status || 500);
			res.json({
				message: err.message,
				error: err
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use('/api', function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({
			message: err.message,
			error: {}
		});
	});

	//app.get('/', function (req, res, next) {
	//	res.locals.data = {
	//		HomeStore: { title: 'test' }
	//	};
	//	next();
	//});

	[
		'channels/channels'
	].forEach(function (module) {
		app.use(require('./' + module + '-endpoints'));
	});

	app.use(function (req, res) {
		alt.bootstrap(JSON.stringify(res.locals.data || {}));

		var iso = new Iso();

		match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
			if (error) {
			res.status(500).send(error.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			iso.add(renderToString(<RoutingContext {...renderProps} />), alt.flush());

			res.status(200).send(templateFn({
				html: iso.render()
			}));
		} else {
			res.status(404).send('Not found')
		}
	});
	});
};
