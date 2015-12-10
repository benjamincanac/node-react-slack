import React from 'react';
//import request from 'superagent-bluebird-promise';

class ChannelMessagesComposer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		};

		this._onChange = this._onChange.bind(this);
		this._onKeyDown = this._onKeyDown.bind(this);
	}

	_onChange(event) {
		this.setState({
			text: event.target.value
		});
	}

	_onKeyDown(event) {
		if (event.keyCode === 13) {
			this._save(event);
		}
	}

	_save(event) {
		this.props.onSave(event.target.value);
		this.setState({
			text: ''
		});
	}

	render() {
		return (
			<input className="form-control channel-input margin-none" name="message" value={this.state.text} onChange={this._onChange} onKeyDown={this._onKeyDown} placeholder="Enter your message" autofocus />
		);
	}
}

ChannelMessagesComposer.PropTypes = {
	onSave: React.PropTypes.func.isRequired
};

export default ChannelMessagesComposer;
