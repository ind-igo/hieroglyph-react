import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Upload from './components/Upload/Upload';

export default (
	<Switch>
		<Route component={Dashboard} exact path="/" />
		<Route component={Upload} path="/upload" />
	</Switch>
);
