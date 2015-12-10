var socket = require('socket.io');
var slug = require('slug');

var conf = require('./conf');
var log = require('debug')(conf.name + ':io');

import Channels from './channels/channels-service';

module.exports = function (server) {
	var io = module.exports.io = socket.listen(server);

	io.on('connection', function (socket) {
		log('User connected. Socket id %s', socket.id);

		socket.on('channel:new', function (data) {
			var channel = {
				name: data.channel.name,
				slug: slug(data.channel.name),
				messages: [],
				date: new Date()
			};

			Channels.create(channel, function (err) {
				if (err) return;

				io.emit('channel:new', channel);
			});
		});

		socket.on('channel:message', function (data) {
			data.message.date = new Date();

			Channels.postMessage(data.room.slug, data.message, function (err, channel) {
				if (err) return;

				io.to(data.room.slug).emit('channel:message', data.message);
			});
		});

		socket.on('channel:join', function (data) {
			log('Socket %s subscribed to %s', socket.id, data.room);

			io.to(data.room).emit('channel:join', { user: data.user });

			socket.join(data.room);
		});

		socket.on('channel:leave', function (data) {
			log('Socket %s unsubscribed from %s', socket.id, data.room);

			socket.leave(data.room);

			io.to(data.room).emit('channel:leave', { user: data.user });
		});

		socket.on('disconnect', function () {
			log('User disconnected. %s. Socket id %s', socket.id);
		});
	});
};
