import alt from '../alt';

import ChannelActions from './channel-actions.react';

class ChannelStore {
	constructor() {
		this.bindListeners({
			updateChannel: ChannelActions.updateChannel
		});

		this.state = {
			channel: null
		};
	}

	updateChannel(channel) {
		this.setState({
			channel: channel
		});
	}
}

export default alt.createStore(ChannelStore, 'ChannelStore');
