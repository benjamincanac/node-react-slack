import alt from '../alt';

import ChannelsActions from './channels-actions.react';

class ChannelsStore {
	constructor() {
		this.bindListeners({
			updateChannels: ChannelsActions.updateChannels
		});

		this.state = {
			channels: []
		};
	}

	updateChannels(channels) {
		this.setState({
			channels: channels
		});
	}
}

export default alt.createStore(ChannelsStore, 'ChannelsStore');
