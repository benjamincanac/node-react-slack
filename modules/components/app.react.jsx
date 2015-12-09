var Iso = require('iso');

import React from 'react';
import { render } from 'react-dom';
import Router from 'react-router';

import routes from './routes.react';
import history from './history.react';

import alt from '../alt';

Iso.bootstrap((state, meta, node) => {
	alt.bootstrap(state);

	render(<Router history={history} routes={routes} />, node);
});
