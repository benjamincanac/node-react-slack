import React from 'react';

class WelcomeView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var view;
		var username = this.props.username;

		if (username) {
			view = <h1>{'Welcome'} {username}</h1>;
		} else {
			view = <input className="form-control" onKeyPress={this.props._onName} placeholder="Please enter your username" />;
		}

		return view;
	}
}

WelcomeView.propTypes = {
	username: React.PropTypes.string
};

export default WelcomeView;
