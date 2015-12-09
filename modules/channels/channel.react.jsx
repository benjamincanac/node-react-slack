import React from 'react';
import { Link } from 'react-router';
import { FormattedDate } from 'react-intl';
import connectToStores from 'alt/utils/connectToStores';

import ChannelStore from './channel-store.react';
import ChannelActions from './channel-actions.react';
import ChannelMessages from './channel-messages.react';
import ChannelMessagesComposer from './channel-messages-composer.react';

class Channel extends React.Component {
	componentDidMount() {
		ChannelActions.getChannel(this.props.params.channelSlug);
	}

	static getStores() {
		return [ChannelStore];
	}

	static getPropsFromStores() {
		return ChannelStore.getState();
	}

	render() {
		var channel = this.props.channel;

		return (
			<div>
				<h3 className="text-purple1 margin-none">{`#${channel.name}`}</h3>
				<h4 className="roboto-light">
					{'This is the very beginning of the '}
					<Link to={`/${channel.slug}`}>#{channel.name}</Link>
					{' channel, which you created on '}
					<FormattedDate value={new Date()} day="numeric" month="long" year="numeric" />
				</h4>
				<ChannelMessages messages={channel.messages} />
				<ChannelMessagesComposer channel={channel} />
			</div>
		);
	}
}

Channel.propTypes = {
	channel: React.PropTypes.object,
	params: React.PropTypes.object
};


export default connectToStores(Channel);
