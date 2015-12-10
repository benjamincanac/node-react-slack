var socket = require('socket.io');

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
				slug: data.channel.name,
				messages: [],
				date: new Date()
			};

			Channels.create(channel, function () {
				io.emit('channel:new', channel);
			});
		});

		socket.on('channel:message', function (data) {
			var message = {
				text: data.message.text,
				user: {
					id: socket.id
				}
			};

			Channels.postMessage(data.room.slug, message, function (err, channel) {
				io.to(data.room.slug).emit('channel:message', message);
			});
		});

		socket.on('channel:join', function (room) {
			log('Socket %s subscribed to %s', socket.id, room);

			io.to(room).emit('channel:join', { id: socket.id });

			socket.join(room);
		});

		socket.on('channel:leave', function (room) {
			log('Socket %s unsubscribed from %s', socket.id, room);

			socket.leave(room, function (err) {
				console.log('err:', err);
			});

			io.to(room).emit('channel:leave', { id: socket.id });
		});

		socket.on('disconnect', function () {
			log('User disconnected. %s. Socket id %s', socket.id);

			console.log(socket.rooms);

			//var rooms = io.sockets.manager.roomClients[socket.id];
			//
			//for(var room in rooms) {
			//	socket.leave(room);
			//
			//	io.to(room).emit('leave', { id: socket.id });
			//}
		});
	});
};
