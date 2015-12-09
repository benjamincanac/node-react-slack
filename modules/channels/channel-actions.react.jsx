import alt from '../alt';
import request from 'superagent-bluebird-promise';

class ChannelActions {
	constructor() {
		this.generateActions(
			'updateChannel',
			'addMessage'
		);
	}

	getChannel(channelSlug) {
		this.dispatch(channelSlug);

		request.get('/api/channels/' + channelSlug)
			.then((response) => {
				this.actions.updateChannel(response.body.channel);
			});
	}

	createMessage(channel, message) {
		request.post(`/api/channels/${channel.slug}/messages`)
				.send({ message: message })
				.then(() => {
					this.dispatch(message);
				});
	}
}

export default alt.createActions(ChannelActions);
