import React from 'react';
import { Link } from 'react-router'
import { Carousel, CarouselItem } from 'react-bootstrap'
import { IntlProvider } from 'react-intl';

//import WelcomeView from './welcomeview.react.jsx';
//import MainView from './mainview.react.jsx';

import Sidebar from '../components/sidebar.react';

class Layout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: props.username
		};

		this._onName = this._onName.bind(this);
	}

	_onName(e) {
		if (e.nativeEvent.keyCode !== 13) return;

		this.setState({
			username: e.target.value
		});
	}

	render() {
		return (
			<IntlProvider locale="en">
				<div id="wrapper">
					<Sidebar />
					<div id="page-content-wrapper">
						<div className="container-fluid">
							{this.props.children}
							{/*<WelcomeView username={this.state.username} _onName={this._onName} />
							 <MainView username={this.state.username} />*/}
						</div>
					</div>
				</div>
			</IntlProvider>
		)
	}
}

Layout.propTypes = {
	username: React.PropTypes.string,
	children: React.PropTypes.element
};

export default Layout;
