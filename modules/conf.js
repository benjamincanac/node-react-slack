var fs = require('fs');
var _ = require('lodash');

var env = module.exports.env = process.env.NODE_ENV || 'development';
var app = require('../package.json').name;
var version = require('../package.json').version;

var log = require('debug')(app + ':conf');

var files = [];
files.push('production');
if (env !== 'production') files.push(env);
if (fs.existsSync('./conf/local.js')) files.push('local');

var sources = [];

files.forEach(function (name) {
	log('Loading ' + name + ' configuration');
	sources.push(require('../conf/' + name));
});

sources.push({
	env: env,
	name: app,
	version: version
});

module.exports = _.merge.apply(null, sources);

