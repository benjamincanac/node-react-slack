import React from 'react';
import Gravatar from 'react-gravatar';
import { FormattedRelative } from 'react-intl';

class ChannelMessages extends React.Component {
	render() {
		var messages = this.props.messages;

		return (
				<ul className="channel-messages">
					{
						messages.map((message, index) => {
							return (
								<li key={index} className="padding-bottom-sm">
									<div className="media">
										<div className="media-left media-middle">
											<Gravatar email={message.user.email} />
										</div>
										<div className="media-body">
											<p className="margin-bottom-xs"><strong>{message.user.email}</strong>{' - '}<i><FormattedRelative value={new Date(message.date)} /></i></p>
											{message.text}
										</div>
									</div>
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
