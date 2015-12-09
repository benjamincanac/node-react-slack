module.exports = {
	log: {
		level: 'combined',
		path: '/var/log/nodes/carel-api.log'
	},
	http: {
		port: process.env.PORT || 3000
	},
	mongo: {
		url: 'mongodb://127.0.0.1:27017/slack'
	}
};

