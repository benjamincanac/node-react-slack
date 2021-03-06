var express = require('express');
var router = express.Router();

var io = require('../io');

import Channels from './channels-service';

router.route('/channels')
	.get(
		function (req, res, next) {
			Channels.find({}, function (err, channels) {
				if (err) return next(err);

				res.json({ channels: channels });
			});
		}
	)

	.post(
		function (req, res, next) {
			var channel = req.body.channel;

			channel.date = new Date();

			Channels.create(channel, function (err) {
				if (err) return next(err);

				io.io.emit('channel:new', channel);

				res.json({ channel: channel });
			});
		}
	);

router.route('/channels/:channelSlug')
	.get(
		function (req, res, next) {
			var channelSlug = req.params.channelSlug;

			Channels.findBySlug(channelSlug, function (err, channel) {
				if (err) return next(err);

				if (!channel) return res.status(404).send('channel-not-found');

				res.json({ channel: channel });
			});
		}
	);

module.exports = router;
