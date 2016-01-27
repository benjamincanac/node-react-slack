import React from 'react';
import { Route, IndexRoute } from 'react-router';

import SessionStore from './sessions/session-store.react';
import SessionActions from './sessions/session-actions.react';

import Layout from './layout.react';
import NotFound from './notfound.react';

import Home from '../home/home.react';
import Channel from '../channels/channel.react';

function sessionResolver(nextState, replaceState) {
	var session = SessionStore.getState().session;

	if (!session) replaceState({ nextPathname: nextState.location.pathname }, '/');
}

var routes = (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home} />
		<Route path="/:channelSlug" component={Channel} />
		<Route path="*" component={NotFound} />
	</Route>
);

export default routes;
