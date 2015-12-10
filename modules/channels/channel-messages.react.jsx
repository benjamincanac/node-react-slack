import React from 'react';

class ChannelMessages extends React.Component {
	render() {
		var messages = this.props.messages;

		return (
				<ul className="channel-messages">
					{
						messages.map((message, index) => {
							return (
								<li key={index}>
									{`${message.user ? message.user.id + ': ' : ''} ${message.text}`}
								</li>
								);
							})
						}
				</ul>
		);
	}
}

ChannelMessages.propTypes = {
	messages: React.PropTypes.array
};


export default ChannelMessages;
