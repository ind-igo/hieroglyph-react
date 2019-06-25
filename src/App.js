import React, { Component } from 'react';
import './App.scss';
import logo from './assets/logo.png';

export default class App extends Component {
	constructor() {
		super();

		this.state = {
			showVideo: false,
			transcriptText: '',
			urlInput: ''
		};
	}

	render() {
		return (
			<div className="container">
				<header>
					<img id="logo" src={logo} alt="heirogly.ph" />
				</header>

				{/* Form */}
				<div id="url-form">
					<input
						id="url-input"
						className="u-full-width"
						type="text"
						placeholder="Insert YouTube URL"
						onChange={e => this.setState({ urlInput: e.target.value })}
					/>
					<button
						id="submit-button"
						className="u-full-width"
						onClick={e => this.submitVideo(e)}
					>
						Submit
					</button>
				</div>

				{/* Video Player */}
				<div id="wrapper">
					<iframe
						title="youtube-frame"
						id="youtube-iframe"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					/>
				</div>
				{/* Button Cluster */}
				<div className="transcript-bar">
					<h5>Transcript</h5>
					<button id="show-button" type="button">
						Show Youtube Video
					</button>
				</div>
				<hr />
				<div id="transcript" />

				{/* If page cannot load (required by Azure) */}
				{/* <div class="container">
				<h1 style="text-align:center;">Hieroglyph</h1>
				<h3 style="text-align:center;">404 - Page Not Found</h3>
			</div> */}
			</div>
		);
	}

	submitVideo = e => {
		e.preventDefault();
		const { urlInput } = this.state;

		const regex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

		if (!regex.test(urlInput)) {
			// set urlInput color to red
			console.log('invalid yt link');
		} else {
			console.log('valid yt link');
		}
	};
}
