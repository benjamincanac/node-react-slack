import React from 'react';
import { Link } from 'react-router'
import connectToStores from 'alt/utils/connectToStores';

import ChannelsStore from '../channels/channels-store.react';
import ChannelsActions from '../channels/channels-actions.react';

class Sidebar extends React.Component {
	componentDidMount() {
		ChannelsActions.getChannels();
	}

	static getStores() {
		return [ChannelsStore];
	}

	static getPropsFromStores() {
		return ChannelsStore.getState();
	}

	render() {
		return (
			<div id="sidebar-wrapper">
				<ul className="sidebar-nav">
					<li className="sidebar-brand">
						<Link to="/"><span className="fa fa-slack fa-lg padding-right-xs" />Slack React</Link>
					</li>
					<li className="text-purple2 text-uppercase">
						Channels
						<span className="text-right">
							<a href=""><span className="fa fa-plus" /></a>
						</span>
					</li>
					{
						this.props.channels.map((channel) => {
							return (
							<li key={channel._id}>
								<Link to={`/${channel.slug}`}># {channel.name}</Link>
							</li>
								);
							})
						}
				</ul>
			</div>
		);
	}
}

Sidebar.propTypes = {
	username: React.PropTypes.string
};

export default connectToStores(Sidebar);
