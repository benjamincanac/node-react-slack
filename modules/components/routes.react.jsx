import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from '../components/layout.react';
import NotFound from '../components/notfound.react';
import Home from '../home/home.react';
import Channel from '../channels/channel.react';

var routes = (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home} />
		<Route path="/:channelSlug" component={Channel} />
		<Route path="*" component={NotFound} />
	</Route>
);

export default routes;
