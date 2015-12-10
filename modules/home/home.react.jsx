import React from 'react';
import connectToStores from 'alt/utils/connectToStores';

import SessionStore from '../components/sessions/session-store.react';
import SessionActions from '../components/sessions/session-actions.react';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: ''
		};

		this.onChange = this.onChange.bind(this);

		this._onChange = this._onChange.bind(this);
		this._onKeyDown = this._onKeyDown.bind(this);
	}

	componentDidMount() {
		SessionStore.listen(this.onChange);
	}

	componentWillUnmount() {
		SessionStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	_onChange(event) {
		this.setState({
			email: event.target.value
		});
	}

	_onKeyDown(event) {
		if (event.keyCode !== 13) return;

		SessionActions.create({
			email: this.state.email
		});
	}

	static getStores() {
		return [SessionStore];
	}

	static getPropsFromStores() {
		return SessionStore.getState();
	}

	render() {
		var view;
		var session = this.props.session;

		if (session) {
			view = <h1>{'Welcome'} {session.email}<br /><small>{'You can start browsing channels'}</small></h1>;
		} else {
			view = (
				<div>
					<h1>{'Welcome to Slack !'}<br /><small>{'You need to register in order to access channels !'}</small></h1>
					<input type="email" className="form-control" name="email" value={this.state.email} onChange={this._onChange} onKeyDown={this._onKeyDown} placeholder="Please enter your email" />
				</div>
			);
		}

		return view;
	}
}

Home.propTypes = {
	email: React.PropTypes.string,
	_onEmail: React.PropTypes.func
};

export default connectToStores(Home);
