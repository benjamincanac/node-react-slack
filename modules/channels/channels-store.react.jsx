import alt from '../alt';

import ChannelsActions from './channels-actions.react';

class ChannelsStore {
	constructor() {
		this.bindListeners({
			getChannels: ChannelsActions.getChannels,
			addChannel: ChannelsActions.addChannel
		});

		this.state = {};
	}

	getChannels(channels) {
		this.setState({
			channels: channels
		});
	}

	addChannel(channel) {
		var channels = this.state.channels || [];

		channels.push(channel);

		this.setState({
			channels: channels
		});
	}
}

export default alt.createStore(ChannelsStore, 'ChannelsStore');
