import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { FormattedDate } from 'react-intl';
import connectToStores from 'alt/utils/connectToStores';

import SessionStore from '../components/sessions/session-store.react.jsx'

import ChannelStore from './channel-store.react';
import ChannelActions from './channel-actions.react';
import ChannelMessages from './channel-messages.react';
import ChannelMessagesComposer from './channel-messages-composer.react';

class Channel extends React.Component {
	constructor(props) {
		super(props);

		this._onSave = this._onSave.bind(this);
	}

	componentDidMount() {
		ChannelActions.getChannel(this.props.params.channelSlug);

		this.props.socket.on('channel:message', function (message) {
			ChannelActions.addMessage(message);
		});

		this.props.socket.on('channel:join', function (data) {
			ChannelActions.addMessage({ text: `joined this channel`, user: data.user, date: new Date() });
		});

		this.props.socket.on('channel:leave', function (data) {
			ChannelActions.addMessage({ text: `left this channel`, user: data.user, date: new Date() });
		});

		this.props.socket.emit('channel:join', {
			room: this.props.params.channelSlug,
			user: SessionStore.getState().session
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.params !== nextProps.params) {
			ChannelActions.getChannel(nextProps.params.channelSlug);

			this.props.socket.emit('channel:leave', {
				room: this.props.params.channelSlug,
				user: SessionStore.getState().session
			});
			this.props.socket.emit('channel:join', {
				room: nextProps.params.channelSlug,
				user: SessionStore.getState().session
			});
		}
	}

	componentWillUnmount() {
		this.props.socket.emit('channel:leave', {
			room: this.props.params.channelSlug,
			user: SessionStore.getState().session
		});
	}

	static getStores() {
		return [SessionStore, ChannelStore];
	}

	static getPropsFromStores() {
		var sessionState = SessionStore.getState();
		var channelState = ChannelStore.getState();

		return {
			session: sessionState.session,
			channel: channelState.channel
		}
	}

	_onSave(text) {
		ChannelActions.createMessage(this.props.socket, this.props.channel, {
			text: text,
			user: SessionStore.getState().session
		});
	}

	render() {
		var data;
		var composer;
		var channel = this.props.channel;

		if (this.props.session) {
			composer = <ChannelMessagesComposer onSave={this._onSave} />;
		}

		if (channel) {
			data = (
				<div>
					<h3 className="text-purple1 margin-none">{`#${channel.name}`}</h3>
					<h4 className="roboto-light padding-bottom-lg">
						{'This is the very beginning of the '}
						<Link to={`/${channel.slug}`}>{'#'}{channel.name}</Link>
						{' channel, which you created on '}
						<FormattedDate value={new Date(channel.date)} day="numeric" month="long" year="numeric" />
					</h4>
					<div className="channel">
						<div className="channel-content">
							<ChannelMessages messages={channel.messages} />
						</div>
						{composer}
					</div>
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
	params: React.PropTypes.object,
	socket: React.PropTypes.object
};

export default connectToStores(Channel);
