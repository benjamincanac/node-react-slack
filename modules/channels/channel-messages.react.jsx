import React from 'react';

class ChannelMessages extends React.Component {
	render() {
		var messages = this.props.messages;

		return (
				<ul>
					{
						messages.map((message, index) => {
							return (
								<li key={index}>
									{message.text}
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
