import alt from '../alt';
import request from 'superagent-bluebird-promise';

class ChannelActions {
	constructor() {
		this.generateActions(
			'updateChannel'
		);
	}

	getChannel(channelSlug) {
		this.dispatch(channelSlug);

		request.get('/api/channels/' + channelSlug)
			.then((response) => {
				this.actions.updateChannel(response.body.channel);
			});
	}
}

export default alt.createActions(ChannelActions);
