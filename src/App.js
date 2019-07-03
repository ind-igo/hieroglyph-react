import React from 'react';
import './App.scss';
import logo from './assets/logo.png'; // hieroglyph commercial
import routes from './routes';

export default function App() {
	return (
		<div className="container">
			<header>
				<img id="logo" src={logo} alt="heirogly.ph" />
			</header>
			{routes}
		</div>
	);
}
