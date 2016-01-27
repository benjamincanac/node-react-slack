import React from 'react';
import { Link } from 'react-router'
import { Modal, Button } from 'react-bootstrap';
import connectToStores from 'alt/utils/connectToStores';

import SessionStore from './sessions/session-store.react';

import ChannelsStore from '../channels/channels-store.react';
import ChannelsActions from '../channels/channels-actions.react';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			name: ''
		};

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this._onSave = this._onSave.bind(this);
		this._onChange = this._onChange.bind(this);

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		SessionStore.listen(this.onChange);

		ChannelsActions.getChannels();

		this.props.socket.on('channel:new', function (channel) {
			ChannelsActions.addChannel(channel);
		});
	}

	componentWillUnmount() {
		SessionStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	close() {
		this.setState({ showModal: false });
	}

	open() {
		this.setState({ showModal: true });
	}

	_onSave() {
		ChannelsActions.createChannel(this.props.socket, {
			name: this.state.name
		});

		this.setState({
			name: ''
		});

		this.close();
	}

	_onChange(event) {
		this.setState({
			name: event.target.value
		});
	}

	static getStores() {
		return [SessionStore, ChannelsStore];
	}

	static getPropsFromStores() {
		var sessionState = SessionStore.getState();
		var channelsState = ChannelsStore.getState();

		return {
			session: sessionState.session,
			channels: channelsState.channels
		}
	}

	render() {
		return (
			<div id="sidebar-wrapper">
				<ul className="sidebar-nav">
					<li className="sidebar-brand">
						<Link to="/"><span className="fa fa-slack fa-lg padding-right-xs" />Slack React</Link>
					</li>
					<li className="text-white">
						<small>{this.props.session ? `Connected as ${this.props.session.email}` : 'You need to connect'}</small>
					</li>
					<li className="text-purple2 text-uppercase">
						Channels
						<span className="text-right">
							<a onClick={this.open}><span className="fa fa-plus" /></a>
						</span>
					</li>
					{
						this.props.channels && this.props.channels.map((channel) => {
							return (
								<li key={channel._id}>
									<Link to={`/${channel.slug}`}># {channel.name}</Link>
								</li>
							);
						})
					}
				</ul>

				<Modal show={this.state.showModal} onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>Create a new channel</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<input
							className="form-control"
							name="name"
							label="Name"
							value={this.state.name}
							onChange={this._onChange}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close}>Close</Button>
						<Button bsStyle="success" onClick={this._onSave}>Save</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

Sidebar.propTypes = {
	username: React.PropTypes.string
};

export default connectToStores(Sidebar);
