import React from 'react';
import { Link } from 'react-router';
import { FormattedDate } from 'react-intl';
import connectToStores from 'alt/utils/connectToStores';

import ChannelStore from './channel-store.react';
import ChannelActions from './channel-actions.react';
import ChannelMessages from './channel-messages.react';
import ChannelMessagesComposer from './channel-messages-composer.react';

class Channel extends React.Component {
	constructor(props) {
		super(props);

		this._onSave = this._onSave.bind(this);

		this.props.socket.on('message', function (message) {
			ChannelActions.addMessage(message);
		});

		this.props.socket.on('join', function (data) {
			ChannelActions.addMessage({ text: `${data.id} just joined this channel` });
		});

		this.props.socket.on('leave', function (data) {
			ChannelActions.addMessage({ text: `${data.id} just left this channel` });
		});
	}

	componentDidMount() {
		ChannelActions.getChannel(this.props.params.channelSlug);

		this.props.socket.emit('join', this.props.params.channelSlug);
	}

	componentWillUnmount() {
		this.props.socket.emit('leave', this.props.params.channelSlug);
	}

	static getStores() {
		return [ChannelStore];
	}

	static getPropsFromStores() {
		return ChannelStore.getState();
	}

	_onSave(text) {
		ChannelActions.createMessage(this.props.channel, {
			text: text
		});
	}

	render() {
		var data;
		var channel = this.props.channel;

		if (channel) {
			data = (
				<div>
					<h3 className="text-purple1 margin-none">{`#${channel.name}`}</h3>
					<h4 className="roboto-light">
						{'This is the very beginning of the '}
						<Link to={`/${channel.slug}`}>#{channel.name}</Link>
						{' channel, which you created on '}
						<FormattedDate value={new Date()} day="numeric" month="long" year="numeric" />
					</h4>
					<ChannelMessages messages={channel.messages} />
					<ChannelMessagesComposer channel={channel} onSave={this._onSave} />
				</div>
			);
		} else {
			data = (
				<div className="text-center">
					<i className="fa fa-spin fa-spinner fa-2x" />
				</div>
			);
		}

		return (
			<div>
				{data}
			</div>
		);
	}
}

Channel.propTypes = {
	channel: React.PropTypes.object,
	params: React.PropTypes.object
};


export default connectToStores(Channel);
