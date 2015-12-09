var socket = require('socket.io');

var conf = require('./conf');
var log = require('debug')(conf.name + ':io');

module.exports = function (server) {
	var io = module.exports.io = socket.listen(server);

	io.on('connection', function (socket) {
		log('User connected. Socket id %s', socket.id);

		socket.on('join', function (room) {
			log('Socket %s subscribed to %s', socket.id, room);

			socket.join(room);

			io.to(room).emit('join', { id: socket.id });
		});

		socket.on('leave', function (room) {
			log('Socket %s unsubscribed from %s', socket.id, room);

			socket.leave(room);

			io.to(room).emit('leave', { id: socket.id });
		});

		socket.on('disconnect', function () {
			log('User disconnected. %s. Socket id %s', socket.id);
		});
	});
};
