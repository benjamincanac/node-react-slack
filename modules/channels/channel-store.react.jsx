import alt from '../alt';

import ChannelActions from './channel-actions.react';

class ChannelStore {
	constructor() {
		this.bindListeners({
			getChannel: ChannelActions.getChannel,
			addMessage: ChannelActions.addMessage
		});

		this.state = {
			channel: null
		};
	}

	getChannel(channel) {
		this.setState({
			channel: channel
		});
	}

	addMessage(message) {
		var channel = this.state.channel;

		channel.messages.push(message);

		this.setState({
			channel: channel
		});
	}
}

export default alt.createStore(ChannelStore, 'ChannelStore');
