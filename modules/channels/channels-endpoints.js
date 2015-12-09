var express = require('express');
var router = express.Router();

import Channels from './channels-service';

router.route('/')
	.get(
		function (req, res, next) {
			Channels.find({}, function (err, channels) {
				if (err) return next(err);

				res.locals.data = {
					ChannelsStore: {
						channels: channels
					}
				};
				return next();
			});
		}
	);

router.route('/:channelSlug')
	.get(
		function (req, res, next) {
			var channelSlug = req.params.channelSlug;

			Channels.findBySlug(channelSlug, function (err, channel) {
				if (err) return next(err);

				if (!channel) return res.status(404).send('channel-not-found');

				res.locals.data = {
					ChannelStore: {
						channel: channel
					}
				};
				return next();
			});
		}
	);

module.exports = router;
