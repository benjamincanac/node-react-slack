import React from 'react';

class MainView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: []
		};
	}

	render() {
		if (!this.props.username) var style = {display:'none'};

		return (
			<div style={style}>
				<input placeholder="Type your message" onKeyPress={this._onMessage} />
			</div>
		);
	}
}

MainView.propTypes = {
	username: React.PropTypes.string
};

export default MainView;
