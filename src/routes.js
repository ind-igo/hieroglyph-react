import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Upload from './components/Upload/Upload';

export default (
	<Switch>
		<Route component={Upload} exact path='/' />
		{/* <Route component={Dashboard} exact path="/dashboard" /> */}
		{/* <Route component={Login} exact path="/login" /> */}
	</Switch>
);
