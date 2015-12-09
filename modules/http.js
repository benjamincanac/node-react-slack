var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var conf = require('./conf');
var log = require('debug')(conf.name + ':http');

var app = module.exports.app = express();

app.set('view engine', 'jade');

app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(__dirname + '/../public'));
app.use(logger(conf.log.level, { stream: conf.log.path ? fs.createWriteStream(conf.log.path, {flags: 'a'}) : process.stdout }));

app.use(require('express-domain-middleware'));

var server = module.exports.server = http.createServer(app);

module.exports.listen = function () {
		server.listen(conf.http.port);
		server.on('error', onError);
		server.on('listening', onListening);
};

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
		if (error.syscall !== 'listen') {
				throw error;
		}

		var bind = typeof port === 'string'
				? 'Pipe ' + port
				: 'Port ' + port;

		// handle specific listen errors with friendly messages
		switch (error.code) {
				case 'EACCES':
						log(bind + ' requires elevated privileges');
						process.exit(1);
						break;
				case 'EADDRINUSE':
						log(bind + ' is already in use');
						process.exit(1);
						break;
				default:
						throw error;
		}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
		var addr = server.address();
		var bind = typeof addr === 'string'
				? 'pipe ' + addr
				: 'port ' + addr.port;
		log('Listening on ' + bind);
}
