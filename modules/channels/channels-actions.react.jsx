import alt from '../alt';
import request from 'superagent-bluebird-promise';

class ChannelsActions {
	constructor() {
		this.generateActions(
			'addChannel'
		);
	}

	getChannels() {
		request.get('/api/channels')
			.then((response) => {
				this.dispatch(response.body.channels);
			});
	}

	createChannel(socket, channel) {
		socket.emit('channel:new', { channel: channel });
	}
}

export default alt.createActions(ChannelsActions);
