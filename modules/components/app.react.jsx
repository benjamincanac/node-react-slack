var Iso = require('iso');

import AltRouter from 'alt-router';
import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router';

import routes from './routes.react';
import history from './history.react';

import alt from '../alt';

Iso.bootstrap((state, meta, node) => {
	var sessionStoreData = {
		SessionStore: {
			session: JSON.parse(localStorage.getItem('session'))
		}
	};

	alt.bootstrap(JSON.stringify(Object.assign(JSON.parse(state), sessionStoreData)));

	render(<Router history={history} routes={routes} />, node);
});
