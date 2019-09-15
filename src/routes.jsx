import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Upload from './views/Upload';
import Search from './views/Search';
import Home from './views/Home';

export const viewRoutes = (
	<Switch>
		<Route component={Home} exact path='/' />
		<Route component={Search} path='/search' />
		{/* <Route component={Upload} path='/upload' /> */}
		{/* <Route component={Read} path='/read/:videoId' /> */}
	</Switch>
);
