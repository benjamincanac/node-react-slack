import alt from '../alt';
import request from 'superagent-bluebird-promise';

class ChannelActions {
	constructor() {
		this.generateActions(
			'addMessage'
		);
	}

	getChannel(channelSlug) {
		request.get('/api/channels/' + channelSlug)
			.then((response) => {
				this.dispatch(response.body.channel);
			});
	}

	createMessage(socket, channel, message) {
		socket.emit('channel:message', { room: channel, message: message });
	}
}

export default alt.createActions(ChannelActions);
