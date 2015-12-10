import alt from '../../alt';

import SessionActions from './session-actions.react';

class SessionStore {
	constructor() {
		this.bindListeners({
			create: SessionActions.create
		});

		this.on('bootstrap', (state) => {
			this.setState({
				session: this.session
			});
		});
	}

	create(session) {
		this.setState({
			session: session
		});

		localStorage.setItem('session', JSON.stringify(session));
	}
}

export default alt.createStore(SessionStore, 'SessionStore');
