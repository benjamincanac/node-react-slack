import alt from '../alt';
import request from 'superagent-bluebird-promise';

class ChannelsActions {
	constructor() {
		this.generateActions(
			'updateChannels'
		);
	}

	getChannels() {
		this.dispatch();

		request.get('/api/channels')
			.then((response) => {
				this.actions.updateChannels(response.body.channels);
			});
	}
}

export default alt.createActions(ChannelsActions);
